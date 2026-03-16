# Premium Dental SaaS Template

A production-ready, highly optimized SaaS template for dental clinics. Built with Next.js 14+ (App Router), Tailwind CSS v4, Framer Motion, Supabase, and Resend.

## Features

- **Modern UI/UX**: Premium aesthetic with responsive design and smooth animations.
- **Appointment System**: Fully functional booking form saving data securely to Supabase.
- **Contact System**: Email-powered contact form utilizing Resend API.
- **Blog System**: Dynamic routing for blog content.
- **Smile Gallery**: Integrated before & after image sliders (`react-compare-slider`).
- **SEO Optimized**: Metadata API and semantic HTML applied to all pages.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS, framer-motion, lucide-react
- **Forms**: React Hook Form, Zod
- **Backend/DB**: Supabase (PostgreSQL)
- **Email**: Resend API
- **Deployment**: Vercel

## Local Setup Instructions

1. **Clone & Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure Environment Variables**
   Duplicate the \`.env.example\` file and rename it to \`.env.local\`.
   Fill in your API keys:
   - \`NEXT_PUBLIC_SUPABASE_URL\`: Found in Supabase dashboard under API settings.
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`: Found in Supabase dashboard under API settings.
   - \`RESEND_API_KEY\`: Generated from Resend dashboard.

3. **Database Setup**
   Run the SQL commands found in \`supabase_schema.sql\` within your Supabase project's SQL Editor to create the necessary tables and Row Level Security (RLS) policies.

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   Access the local server at [http://localhost:3000](http://localhost:3000).

## Vercel Deployment Instructions

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository.
4. In the "Environment Variables" section, add:
   - \`NEXT_PUBLIC_SUPABASE_URL\`
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
   - \`RESEND_API_KEY\`
   - \`NEXT_PUBLIC_WHATSAPP_NUMBER\`
5. Click **Deploy**. Vercel will automatically detect the Next.js framework and configure the build settings.

## Support
For issues or questions regarding this template, please refer to the Next.js or Supabase documentation.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
