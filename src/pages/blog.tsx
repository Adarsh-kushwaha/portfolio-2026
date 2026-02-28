/**
 * Blog — Lists Medium blog posts with modern card design
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, ArrowUpRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useMediumBlogs } from "@/hooks/use-medium-blogs";

const gradients = [
    "from-primary/20 to-primary-glow/10",
    "from-gold/20 to-gold/5",
    "from-teal-500/20 to-teal-500/5",
    "from-purple-500/20 to-purple-500/5",
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Blog() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const { data: blogs, isLoading, isError } = useMediumBlogs();

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
                <div className="container-max section-padding py-0">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors font-heading font-500"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            See My Portfolio
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-9 rounded-lg bg-gradient-teal flex items-center justify-center shadow-teal">
                                <span className="font-heading text-sm font-bold text-primary-foreground">AK Blogs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-20">
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <span className="section-label mb-4 block">Blog</span>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
                            Thoughts & <span className="text-gradient-teal">Insights</span>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
                            Writing about frontend architecture, design systems, performance, and the human side of engineering.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pb-20 md:pb-28">
                <div className="container-max px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : isError ? (
                        <div className="text-center py-20 text-red-500">
                            Failed to load blogs. Please try again later.
                        </div>
                    ) : blogs?.length === 0 ? (
                        <div className="text-center py-20 text-foreground-muted">
                            No blogs found.
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid gap-6 md:gap-8"
                        >
                            {blogs?.map((post, index) => {
                                const coverGradient = gradients[index % gradients.length];
                                return (
                                    <motion.a
                                        key={post.link}
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variants={cardVariants}
                                        onMouseEnter={() => setHoveredId(post.link)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        className="group block glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500"
                                    >
                                        <div className="p-6 md:p-8 lg:p-10">
                                            {/* Top meta row */}
                                            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-foreground-muted">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                                    {post.date}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-border" />
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-gold" />
                                                    {post.author}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 flex items-start gap-3">
                                                <span className="flex-1">{post.title}</span>
                                                <ArrowUpRight className="w-5 h-5 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 text-primary" />
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="text-foreground-muted leading-relaxed mb-6 md:hidden">
                                                {post.description.split(' ').slice(0, 15).join(' ')}
                                                {post.description.split(' ').length > 15 && "..."}
                                            </p>
                                            <p className="text-foreground-muted leading-relaxed mb-6 hidden md:block">
                                                {post.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.slice(0, 5).map((tag, i) => (
                                                    <span
                                                        key={tag}
                                                        className={`px-3 py-1 rounded-full text-xs font-heading font-500 bg-muted border border-border text-foreground-muted group-hover:border-primary/30 group-hover:text-primary/80 transition-all duration-300 ${i >= 2 ? "hidden md:inline-flex" : ""
                                                            }`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom accent line */}
                                        <div
                                            className={`h-0.5 bg-gradient-to-r ${coverGradient} transition-all duration-500 ${hoveredId === post.link ? "opacity-100" : "opacity-0"
                                                }`}
                                        />
                                    </motion.a>
                                )
                            })}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-8">
                <div className="container-max px-4 sm:px-6 lg:px-8 text-center text-sm text-foreground-muted">
                    Made by Adarsh with ❤️ and way too much coffee
                </div>
            </footer>
        </div>
    );
}
