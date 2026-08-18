interface VideoEmbedProps {
    src: string
    title: string
}

export function VideoEmbed({ src, title }: VideoEmbedProps) {
    return (
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-sm mt-2">
            <iframe
                src={src}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
            />
        </div>
    )
}