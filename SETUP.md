# 🚀 Quick Start Guide - Edhe Project

## ✅ Project Setup Complete!

Your Edhe studio landing page has been successfully reconstructed as a full Next.js project. Here's everything you need to know:

---

## 📋 What's Included

✓ **Next.js 15** - React framework with SSR/SSG
✓ **Three.js** - 3D particle animations
✓ **GSAP** - Advanced scroll animations
✓ **Tailwind CSS** - Utility-first styling
✓ **Lenis** - Smooth scroll library
✓ **TypeScript** - Type safety
✓ **All original content** - Services, process, projects, contact

---

## 🎯 Getting Started

### 1. Install Dependencies (Already Done!)
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit: `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
edhe/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ParticleField.tsx  # 3D particle animation
│   ├── Navbar.tsx         # Navigation
│   └── Landing.tsx        # Full landing page
├── lib/                   # Utility functions
│   └── animations.ts      # Animation helpers
├── types/                 # TypeScript types
│   └── index.ts
├── public/                # Static assets
│   └── images/           # Project images
├── package.json          # Dependencies
└── tailwind.config.js    # Tailwind configuration
```

---

## 🎨 Key Components

### **ParticleField.tsx**
- Three.js canvas with particle animation
- Responsive particle count
- Dynamic motion with velocity
- GPU-optimized rendering

### **Navbar.tsx**
- Fixed sticky navigation
- Mobile-responsive menu
- Smooth scroll links
- Hover animations

### **Landing.tsx**
Main landing page with 8 sections:
1. **Hero** - "What?" intro
2. **Vision** - About Edhe philosophy
3. **Services** - 6 service offerings
4. **Process** - 4-step workflow
5. **Projects** - 3 case studies
6. **Contact/CTA** - Conversion section
7. **Footer** - Branding & copyright

---

## 🎬 Features Implemented

### Content
- ✓ All original text content
- ✓ All 6 services with descriptions
- ✓ 4-step process flow
- ✓ 3 project showcases
- ✓ Contact form
- ✓ WhatsApp integration
- ✓ Email links

### Design
- ✓ Light theme (#FAF9F6 background)
- ✓ Accent color (#E34A27 orange)
- ✓ Custom typography (Cabinet Grotesk, Satoshi, JetBrains Mono)
- ✓ Responsive grid layouts
- ✓ Mobile-first design
- ✓ Proper spacing and hierarchy

### Animations
- ✓ Particle field background
- ✓ Scroll-reveal animations
- ✓ Parallax effects (data-speed attributes)
- ✓ Hover transitions
- ✓ Image zoom on hover
- ✓ Color transitions
- ✓ Pulse animation indicator

### Images
- ✓ Meridian project image
- ✓ Kora Studio project image
- ✓ Atlas Commerce project image
- All stored in `/public/images/`

---

## 🔧 Customization Guide

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  accent: "hsl(13 77% 52%)",  // Change this
  // ... other colors
}
```

### Update Content
Edit `components/Landing.tsx`:
```js
const SERVICES = [...]  // Edit services
const STEPS = [...]     // Edit process steps
const PROJECTS = [...]  // Edit projects
```

### Modify Particle Animation
Edit `components/ParticleField.tsx`:
```js
const particleCount = 2000;  // More/fewer particles
material.size = 0.08;        // Particle size
material.opacity = 0.4;      // Transparency
```

### Update Contact Info
In `components/Landing.tsx`, find and update:
- Email: `hello@edhe.studio`
- WhatsApp: `+91 90000 00000`

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with Tailwind's breakpoint system.

---

## ⚡ Performance Notes

- Lazy loading on images
- Optimized Three.js particle rendering
- CSS animations use GPU (transform, opacity)
- Minimal JavaScript bundle
- No unused dependencies

---

## 🔍 Development Tips

### Debug Mode
Add `?debug=true` to URL to see element inspectors

### Tailwind IntelliSense
If using VS Code, install Tailwind CSS IntelliSense extension for autocomplete

### TypeScript Benefits
- Type safety across components
- Better IDE autocomplete
- Early error detection

### Hot Reload
Development server auto-refreshes on file changes

---

## 📤 Deployment Options

### Vercel (Recommended for Next.js)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Docker
Create `Dockerfile` for containerization

### Traditional Hosting
```bash
npm run build
npm start
```
Then serve from your hosting provider

---

## 🐛 Troubleshooting

### Build Fails?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port 3000 Already in Use?
```bash
npm run dev -- -p 3001
```

### Images Not Loading?
- Check image paths in `/public/images/`
- Verify image filenames match in `Landing.tsx`
- Browser cache: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Styles Not Applying?
- Rebuild Tailwind: `npm run build`
- Check class names match Tailwind syntax
- Verify classes in `className` attributes

---

## 📚 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Three.js Docs**: https://threejs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **GSAP Docs**: https://gsap.com/docs

---

## 💡 Next Steps

1. **Update Contact Info** - Add real email and WhatsApp
2. **Connect Form** - Integrate contact form with backend
3. **Analytics** - Add Google Analytics or Vercel Analytics
4. **SEO** - Update meta tags for each page
5. **Images** - Optimize and compress project images
6. **Performance** - Run Lighthouse audit
7. **Testing** - Add unit/integration tests
8. **Domain** - Configure custom domain

---

## 📞 Support

For questions about the code or implementation:
1. Check README.md for full documentation
2. Review component comments
3. Check TypeScript types in `/types`
4. Inspect data attributes for animation logic

---

**Happy building! 🚀**
Built with curiosity and Next.js.
