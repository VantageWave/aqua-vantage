import AOIGrid from './_components/AOIGrid';

export default function CatalogsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <AOIGrid id={params.id} />
    </div>
  );
}
