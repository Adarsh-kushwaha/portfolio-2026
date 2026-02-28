import { useQuery } from '@tanstack/react-query';

export interface MediumBlog {
    title: string;
    date: string;
    link: string;
    author: string;
    description: string;
    tags: string[];
}

interface RssResponse {
    status: string;
    feed: {
        url: string;
        title: string;
        link: string;
        author: string;
        description: string;
        image: string;
    };
    items: Array<{
        title: string;
        pubDate: string;
        link: string;
        guid: string;
        author: string;
        thumbnail: string;
        description: string;
        content: string;
        enclosure: any;
        categories: string[];
    }>;
}

const stripHtmlAndTruncate = (html: string, wordCount: number) => {
    // Strip HTML tags using regex and replace multiple spaces/newlines with a single space
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    const words = text.split(' ');
    if (words.length <= wordCount) return text;

    return words.slice(0, wordCount).join(' ') + '...';
};

export const useMediumBlogs = () => {
    return useQuery<MediumBlog[], Error>({
        queryKey: ['medium-blogs'],
        queryFn: async () => {
            try {
                const response = await fetch(
                    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@heyadarshhere'
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch Medium blogs: ${response.status} ${response.statusText}`);
                }

                const data: RssResponse = await response.json();

                if (data.status !== 'ok') {
                    throw new Error('Medium API returned an error status');
                }

                // Map and format the items to match desired output
                const formattedBlogs: MediumBlog[] = data.items.map((item) => ({
                    title: item.title,
                    date: item.pubDate,
                    link: item.link,
                    author: item.author,
                    description: stripHtmlAndTruncate(item.description, 40),
                    tags: item.categories,
                }));

                return formattedBlogs;
            } catch (error) {
                // Re-throw the error so react-query can catch and expose it
                throw error instanceof Error ? error : new Error('An unknown error occurred');
            }
        },
        // Useful options: avoid refetching on every window focus if blogs don't change that often
        staleTime: 1000 * 60 * 15, // 15 minutes
        retry: 1, // Only retry once before showing error component
    });
};
