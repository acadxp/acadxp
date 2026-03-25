import NavBar from "@/components/landing/NavBar";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "AcadXP - Level up your academic journey",
  description:
    "A premium productivity platform that turns learning into a high-stakes adventure. No fluff. Just data-driven mastery.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and manifest links */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/img/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/img/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/img/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/img/favicon_io/site.webmanifest" />
        <link rel="shortcut icon" href="/assets/img/favicon_io/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/img/favicon_io/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/assets/img/favicon_io/android-chrome-512x512.png"
        />
      </head>
      <body>
        <div className="min-h-screen selection:bg-[#4F46E5] selection:text-white bg-white">
          <NavBar />
          <main className="flex-1 z-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
