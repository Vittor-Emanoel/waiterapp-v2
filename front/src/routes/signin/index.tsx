import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin/")({
  component: SigninPage,
});

function SigninPage() {
  return <div>Hello "/signin/"!</div>;
}
