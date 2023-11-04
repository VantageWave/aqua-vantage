import PageContainer from '../components/PageContainer';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
