import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosService],
    }).compile();

    service = module.get<VideosService>(VideosService);
  });

  it('crea la instancia del servicio correctamente', () => {
    expect(service).toBeDefined();
  });

  describe('calculateHype', () => {
    it('calcula el hype normal sumando likes y comentarios, y dividiendo entre las vistas', () => {
      const hype = (service as any).calculateHype('Video normal', '1000', '100', '50');
      expect(hype).toBe(0.15);
    });

    it('le da el doble de hype a los tutoriales (sin importar mayúsculas)', () => {
      const hype1 = (service as any).calculateHype('Un TUTORIAL de React', '1000', '100', '50');
      const hype2 = (service as any).calculateHype('aprende con este tutorial', '1000', '100', '50');
      expect(hype1).toBe(0.30);
      expect(hype2).toBe(0.30);
    });

    it('devuelve 0 de hype si la api no manda los comentarios', () => {
      const hype = (service as any).calculateHype('Video', '1000', '100', undefined);
      expect(hype).toBe(0);
    });

    it('devuelve 0 de hype si el video no tiene vistas para evitar dividir por cero', () => {
      const hype = (service as any).calculateHype('Video', '0', '100', '50');
      expect(hype).toBe(0);
    });
  });

  describe('getRelativeTime', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-04-20T12:00:00.000Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('muestra el tiempo en meses para videos antiguos', () => {
      const date = new Date('2026-02-19T12:00:00.000Z').toISOString();
      const relative = (service as any).getRelativeTime(date);
      expect(relative).toMatch(/Hace 2 meses/);
    });

    it('muestra el tiempo en días para videos de esta misma semana/mes', () => {
      const date = new Date('2026-04-15T12:00:00.000Z').toISOString();
      const relative = (service as any).getRelativeTime(date);
      expect(relative).toMatch(/Hace 5 d[íi]as/i);
    });

    it('respeta el singular cuando solo pasa 1 día, mes, año, etc', () => {
      const date = new Date('2026-04-19T12:00:00.000Z').toISOString();
      const relative = (service as any).getRelativeTime(date);
      expect(relative).toMatch(/Hace 1 d[íi]a/i);
    });
  });
});
