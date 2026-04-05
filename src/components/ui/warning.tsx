export default function Warning({ title = "", style = "" }) {
  return <p className={"border-[1px] border-red-500/25 bg-secondary/50 px-10 py-2 " + style}>{title}</p>;
}
