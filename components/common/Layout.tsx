import Seo from "./Seo";

export default function Layout({ children }: any) {
  return (
    <>
      <Seo title="Home" />
      <div>{children}</div>
    </>
  );
}
