export default function PageTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-row items-center gap-5 mb-10">
      <div className="h-32 md:h-28 w-1 bg-primary-hover rounded-full"></div>
      <div>
        <h2 className="title-lg">{title}</h2>
        <p className="text-text/50 max-w-prose">{description} </p>
      </div>
    </div>
  );
}
