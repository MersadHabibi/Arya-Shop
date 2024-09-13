const ArticleCard = () => {
  return (
    <article className="relative flex h-[412px] w-[300px] shrink-0 flex-col gap-2 rounded-xl p-4 text-xl shadow-lg">
      <div className="relative aspect-[268/200] w-full overflow-hidden rounded-lg">
        {/* <Image src={""} fill alt=""/> */}
        <div className="h-full w-full bg-base-200"></div>
      </div>

      <h3 className="font-bold">اسم مقاله</h3>

      <p className="line-clamp-4 overflow-hidden">
        مختصری از شرح مقاله در این قسمت نوشته شود. مختصری از شرح مقاله در این
        قسمت نوشته شود
      </p>

      <p className="text-secondary">نویسنده: نام و نام خانوادگی </p>
    </article>
  );
};

export default ArticleCard;
