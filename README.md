# AI Headshot

AI Headshot is a Vite + React application that turns a selfie into a polished
professional headshot. Upload an image, choose a style, preview the generated
result, and download or share it in JPG, PNG, or WEBP format.

The app uses [Cloudinary](https://cloudinary.com/) for direct browser uploads,
image delivery, and generative transformations. No application server is
required.

## Features

- Upload JPG, PNG, or WEBP images by drag and drop or through the Cloudinary
  upload widget.
- Preview the original uploaded image.
- Generate three professional styles:
  - **Corporate Executive** — navy suit and a modern office background.
  - **Outdoor Professional** — crisp white shirt and a golden-hour garden.
  - **Urban Business** — charcoal blazer and an urban city background.
- Compare the original and selected result.
- Download the result, open it in a new tab, or copy its Cloudinary URL.
- Export as JPG, PNG, or WEBP.
- Responsive dark interface built with Tailwind CSS.

> Generative transformations are processed by Cloudinary and can take
> approximately 30–60 seconds per style.

## Requirements

- Node.js `20.19+` or `22.12+`
- npm
- A Cloudinary account with:
  - A cloud name
  - An **unsigned upload preset**
  - Generative transformation support enabled for the account

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Cloudinary

Copy the example environment file:

```bash
copy .env.example .env
```

Then update `.env`:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

In the Cloudinary dashboard, create an unsigned upload preset and use its
name for `VITE_CLOUDINARY_UPLOAD_PRESET`. Restart the development server after
changing environment variables.

Only public Cloudinary configuration belongs in these variables. Never put a
Cloudinary API secret in a `VITE_` variable or in client-side source code.

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite, usually
`http://localhost:5173`.

## Available Scripts

| Command           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start the Vite development server.                    |
| `npm run build`   | Type-check the project and create a production build. |
| `npm run lint`    | Run ESLint.                                           |
| `npm run preview` | Preview the production build locally.                 |

## How It Works

1. The user selects or drops an image in the upload area.
2. The browser uploads the image directly to Cloudinary using the configured
   unsigned preset.
3. The returned Cloudinary `public_id` is stored in React state.
4. The app builds Cloudinary transformation URLs for each headshot preset.
5. Selecting a preset renders the transformed image and enables export actions.

The generated images are delivered on demand by Cloudinary. The project does
not persist application records or run a custom API.

## Project Structure

```text
src/
├── cloudinary/
│   ├── config.ts             # Cloudinary client and environment config
│   ├── upload-direct.ts      # Direct upload with progress reporting
│   └── UploadWidget.tsx      # Cloudinary Upload Widget integration
├── components/
│   ├── ExportActions.tsx     # Format selection and export controls
│   ├── Hero.tsx              # Landing-page introduction
│   ├── ResultPreview.tsx     # Before/after selected result
│   ├── TransformationGrid.tsx # Preset selection
│   └── UploadCard.tsx        # Drag-and-drop upload interface
├── hooks/
│   └── use-headshot.tsx      # Upload and selection state
├── lib/
│   ├── transformations.ts    # Presets and Cloudinary URL construction
│   └── utils.ts              # Shared class-name utilities
├── pages/
│   └── Home.tsx              # Main page composition
├── App.tsx                   # Application entry component
└── index.css                 # Tailwind theme and global styles
```

## Configuration Notes

- Vite exposes only variables prefixed with `VITE_` to browser code.
- The upload widget script is loaded from Cloudinary in `index.html`.
- The app validates that the Cloudinary cloud name is configured at startup.
- Uploads are restricted to one JPG, PNG, or WEBP image at a time.
- An unsigned upload preset is convenient for this client-only demo, but
  production applications should consider a server-side signed upload flow,
  authenticated users, upload limits, and retention policies.

## License

No license has been specified for this project yet.
