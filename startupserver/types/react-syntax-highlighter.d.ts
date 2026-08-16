declare module "react-syntax-highlighter" {
  import { ReactNode } from "react";

  interface SyntaxHighlighterProps {
    children: string;
    style?: Record<string, Record<string, string | number>>;
    language?: string;
    PreTag?: string | React.ComponentType<any>;
    CodeTag?: string | React.ComponentType<any>;
    [key: string]: any;
  }

  export const Prism: React.FC<SyntaxHighlighterProps>;
  export const Light: React.FC<SyntaxHighlighterProps>;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  const oneDark: Record<string, Record<string, string | number>>;
  export = oneDark;
}
