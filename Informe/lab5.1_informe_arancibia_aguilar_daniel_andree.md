# Laboratorio 5.1: creacion-de-un-workflow-de-github-actions-para-ci

**Alumno:** Daniel Andree Arancibia Aguilar
**Fecha:** 11 de Mayo 2026

---

## **1. Objetivo del Laboratorio**

Implementar un pipeline de **Integración Continua (CI)** para una API REST CRUD desarrollada en **NestJS**, utilizando **GitHub Actions**, con el fin de automatizar la compilación, pruebas y análisis de calidad del código.

---

## **2. Descripción del Proyecto**

El proyecto consiste en una **API RESTful CRUD de Productos** desarrollada con el framework **NestJS**.

El pipeline CI tiene las siguientes responsabilidades:

- Instalar dependencias
- Compilar la aplicación (build)
- Ejecutar linting (análisis estático)
- Ejecutar pruebas unitarias e integrales
- Generar reporte de cobertura de código
- Bloquear merges a `main` si el pipeline falla

---

## **3. Código del Workflow (.github/workflows/ci.yml)**

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: nestjs-crud-ci
    strategy:
      matrix:
        node-version: [24.x]
    steps:
      - name: Checkout del código
        uses: actions/checkout@v4

      - name: Configurar Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Instalar dependencias
        run: npm ci

      - name: Compilar aplicación
        run: npm run build

      - name: Linting (análisis estático)
        run: npm run lint

      - name: Ejecutar pruebas unitarias e integrales
        run: npm run test -- --coverage

      - name: Generar reporte de cobertura
        if: success()
        run: echo "Workflow completado correctamente."
```

---

## **4. Capturas del laboratorio**

**Estructura del proyecto NestJS**
![Estructura del proyecto](./img/dc5f5831ac434413f7b2746900f9b375.png)

**Ejecución exitosa de las pruebas**
![Pruebas completadas con éxito](./img/09d24e120eee91c974deb5000952e797.png)

**Historial de Workflows en GitHub Actions**
![Historial de ejecuciones](./img/2d844efb992bfff085b6df84eb349892.png)

**Detalle de Workflow Exitoso**
![Workflow completado correctamente](./img/a3f9907c1850874fc7dd9475dcb02518.png)

**Bloqueo de Merge mientras el Workflow está en ejecución**
![Bloqueo de merge](./img/f2e49e699c22f3d7b60c8c2ca2e5ea8f.png)

**Pull Request Mergeada**
![PR mergeada exitosamente](./img/fce34569186481e8f9a639066b2583f7.png)

**Ejemplo de Workflow Fallido**
![Workflow fallido](./img/bac1ac2c6df82e0b7c7852b2da9cd0e2.png)

**Reglas de Protección de Rama (Branch Protection Rules)**
![Reglas de protección de rama](./img/c3ebfeaf6bc035f6fe3ec3ba2fc3d184.png)

---

## **5. Conclusiones **

La implementación del pipeline de **Continuous Integration** con GitHub Actions permitió automatizar todo el proceso de verificación de código, garantizando que solo código estable, probado y revisado sea integrado a la rama principal.

**Principales beneficios obtenidos:**

- Detección temprana de errores
- Mantenimiento de estándares de calidad (linting + pruebas)
- Mayor confianza en los merges gracias a las reglas de protección de rama
- Automatización de tareas repetitivas
