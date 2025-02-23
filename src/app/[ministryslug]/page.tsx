import type { Metadata, ResolvingMetadata } from "next";
import CheckIn from "@/views/checkin/CheckIn.view";

type Props = {
  params: Promise<{ ministryslug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const { ministryslug } = await params;
  // fetch data
  const { ministry } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ministry/${ministryslug}`).then((res) =>
    res.json()
  );
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${ministry.name} - Check In`,
    description: `Digital check in experience for ${ministry.name}`,
    alternates: {
      canonical: `/${ministryslug}`,
    },
    openGraph: {
      images: [ministry.ministryImageUrl, ...previousImages],
    },
  };
}

export default function Home({ params }: { params: { ministryslug: string } }) {
  return <CheckIn />;
}
