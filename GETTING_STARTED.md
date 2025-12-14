# Getting Started with Illusion Breaker

This guide will help you get Illusion Breaker up and running in minutes.

## Step 1: Install Dependencies

```bash
npm install
```

This installs:

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios (for API calls)

## Step 2: Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Step 3: Explore the Interface

### Landing Page

Navigate to the home page to see:

- Feature overview
- How it works
- Browser extension installation guide
- Disclaimer about mocked inference

### Dashboard

Click "Try Demo Analysis" or navigate to `/dashboard` to:

- Select from predefined demo scenarios
- View trust scores
- Examine claim breakdowns
- Review evidence flags
- Read transparent reasoning

## Step 4: Install the Browser Extension (Optional)

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `extension` folder from this project
6. Click the extension icon on any webpage

**Note**: You'll need to create simple icon files first. See `extension/ICONS_README.md`

## Step 5: Test the API

### Using cURL

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a test article about a scientific study.",
    "contentType": "news-article"
  }'
```

### Using the Dashboard

Simply click one of the demo buttons to trigger the API.

## Development Tips

### File Watching

Next.js has built-in hot reload. Changes to files will automatically refresh the browser.

### TypeScript

All TypeScript errors will be shown in the terminal. Make sure to check them!

### Tailwind CSS

Use Tailwind utility classes directly in your JSX. No need to write custom CSS.

### Adding New Mock Patterns

Edit `lib/mock_data.ts` to add new analysis scenarios.

## Common Issues

### Port Already in Use

If port 3000 is taken, Next.js will prompt you to use a different port.

### Extension Not Loading

Make sure you've selected the correct `extension` folder and have icon files present.

### TypeScript Errors

Run `npm run build` to see all TypeScript errors at once.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in `.next/`

To test the production build locally:

```bash
npm start
```

## Deploying to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy with default settings
4. Update the extension's API URL to your Vercel deployment

## Next Steps

- Customize the mock analysis patterns
- Adjust the UI theme colors
- Add more content type scenarios
- Experiment with the Kestra workflow
- Test the Python agent independently

Happy coding!


