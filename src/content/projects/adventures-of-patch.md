Adventures of Patch is a visual and narrative production pipeline that makes one-page comics. The output is a repeatable, inspectable artifact with provenance.

The project exists because I needed a way to generate Patch Fairytales without manually composing each page. The pipeline takes a `core_lesson`, builds source scenes, renders a finished page, and writes a `manifest.json` that records what was used, how it was approved, and what the fairytale is trying to say.

The result is small, durable, and reviewable. Every published fairytale has a single image, a one-line lesson, and a provenance trail. The pipeline is not an art tool; it is a production system. The goal is to remove the mechanical work so the creative decisions are the only hard part.

The repository is public: [github.com/HarleyBartles/adventures-of-patch](https://github.com/HarleyBartles/adventures-of-patch). A random fairytale from this pipeline appears on the homepage.
