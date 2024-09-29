import '../styles/globals.css';

export const metadata = {
  title: "Conte Qualquer Coisa",
  description: "É literalmente o que tá escrito acima kkk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}
