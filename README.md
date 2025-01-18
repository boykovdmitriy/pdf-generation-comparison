# PDF Library Comparison

``IMPORTANT:
Use yarn to install. NPM may work incorrectly due to problems with eslint and NX. In short, there was a version mismatch in the eslint configuration of the NX project generator, and `npm install` resulted in an error.
``
## Information
Its code base is related to the article [[]] and [[]]. I decided to review different pdf generation libraries. It can help you decide faster what to use and provide some basic use cases.

You can find a live example [here](https://pdf-generation-comparison-e8t6jmqv9-boykovdmitriys-projects.vercel.app)(if it still works, of course, but feel free to run locally).

In this repository:
* NX mono repo and component generator
* Next.js application with server and client side generation of pdf
* Examples for JSPdf, PDFLib, PDFMake, PDFMe, ReactPdf
* Reusable library with components, storybook and tests(storybook and vitest). I just wanted to add it

What doesn't work?
* Server side generation for PDF Make
* Vitest tests. It used to work, maybe i would fix it later since it's not main thing for completion

## Structure
*   **apps/web** - Application with code examples. Generators you can find in Src/PdfGeneration
*   **libs** - UI library

During work on this comparison, I used NX mono repo because I could and wanted to. There was no particular reason, but it was fun.

How to start?
## Run tasks

To run the dev server for your app, use:

```sh
npx nx dev web
```

To create a production bundle:

```sh
npx nx build web
```

To see all available targets to run for a project, run:

```sh
npx nx show project web
```
