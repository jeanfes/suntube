# Decisiones Técnicas - SunTube

Este documento detalla el enfoque general, las decisiones técnicas y las simplificaciones realizadas durante el desarrollo de la prueba "La Cartelera de Hype Tecnológico".

## Enfoque General

El objetivo fue crear una solución limpia y mantenible que cumpla con los criterios de negocio (cálculo de Hype y transformación de fechas) sin depender de librerías externas para lógica central. Se priorizó la separación de responsabilidades entre backend y frontend.

## Decisiones Técnicas Principales

### 1. Monorepo con pnpm Workspaces

Se eligió una estructura de monorepo para mantener el backend y el frontend en un solo repositorio, facilitando la gestión de dependencias compartidas y la ejecución del proyecto completo con una única instalación.

### 2. Backend (NestJS)

- **Transformación de datos en el servidor**: Toda la lógica de negocio (cálculo de Hype y fechas relativas) vive en el backend. El frontend recibe un JSON limpio y listo para renderizar, sin exponer datos crudos de YouTube.
- **JavaScript nativo para fechas**: Se implementó una función personalizada con el objeto `Date` nativo para calcular tiempos relativos ("Hace X días"), cumpliendo con la restricción de no usar `moment.js` ni `date-fns`.
- **Filtro de excepciones global**: Se configuró un `AllExceptionsFilter` para que todos los errores del servidor devuelvan una estructura consistente.

### 3. Frontend (React + Vite)

- **Vite como build tool**: Elegido por su velocidad en desarrollo y simplicidad de configuración frente a Create React App.
- **`fetch` nativo**: Sin librerías de HTTP adicionales; el consumo del endpoint se maneja con `fetch` estándar.
- **Arquitectura de componentes**:
  - `HeroVideo`: Renderiza la "Joya de la Corona" (video con mayor Hype) con tratamiento visual especial.
  - `VideoCard`: Tarjeta estándar para el resto de la grilla.
  - `VideoGrid`: Orquesta la separación entre el video destacado y la grilla general.
- **CSS Vanilla con variables**: Se usaron custom properties de CSS para mantener consistencia visual sin la sobrecarga de un framework de utilidades.

### Cálculo del Nivel de Hype

- **Fórmula base**: `(likes + comentarios) / vistas`
- **Multiplicador Tutorial**: Si el título contiene la palabra "tutorial" (sin importar mayúsculas/minúsculas), el hype se multiplica por 2.
- **Comentarios desactivados**: Si el video no tiene la propiedad `commentCount` en el JSON, el Hype es automáticamente `0`.
- **División por cero**: Videos con 0 vistas devuelven `hypeLevel: 0` sin error matemático.

## Problemas Encontrados y Soluciones

- **CORS**: El frontend no podía comunicarse con el backend por restricciones de origen cruzado. Se habilitó CORS en el `main.ts` de NestJS con `app.enableCors()`.
- **Tipado entre proyectos**: Se sincronizaron las interfaces de TypeScript en ambos lados para asegurar consistencia.

## Uso de Herramientas de IA

Se utilizó **Claude (Anthropic)** como apoyo durante el desarrollo, principalmente para revisión de criterios de aceptación, validación de edge cases y generación de documentación.

**Prompts relevantes utilizados:**

- *"Audita el DTO de respuesta y confirma que ningún campo del payload crudo de YouTube queda expuesto en el contrato de la API."*
- *"Genera el README.md del proyecto con estructura de monorepo pnpm, incluyendo requisitos, instalación, variables de entorno y comandos de ejecución por separado para backend y frontend."*
- *"Genera el DECISIONS.md documentando el enfoque general, decisiones técnicas, reglas de negocio implementadas, problemas encontrados y uso de IA."*

### Páginas adicionales (Valor Agregado)

Se implementaron páginas adicionales más allá de lo solicitado, con el objetivo de demostrar una arquitectura de frontend más completa y cercana a un producto real:

- **VideoDetail**: Vista de detalle individual de un video.
- **History**: Registro de videos visitados recientemente.
- **Favorites**: Sección para marcar videos como favoritos.