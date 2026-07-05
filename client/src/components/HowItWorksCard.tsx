import { Shirt, Sparkles, ShoppingBag } from "lucide-react";
const HowItWorksCard = () => {

    const resource = [
        {
            title: 'Upload your pieces',
            description: "Fashion designers showcase their garments on the platform — from independent labels to emerging talent.",
            label: "Designers",
            icon: Shirt,
            delay: 'animate-delay-200'
        },
        {
            title: 'Style complete looks',
            description: "Content creators and stylists curate outfits from available pieces, building shoppable looks their audience loves.",
            label: "Creators",
            icon: Sparkles ,
            delay: 'animate-delay-400'
        },
        {
            title: 'Shop styled outfits',
            description: "Discover and buy complete outfits styled by creators you follow — no more guessing what goes together.",
            label: "Customers",
            icon: ShoppingBag,
            delay: 'animate-delay-600'
        }
    ]
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
            {resource.map((item) => (
                <div className={`animate-fade-up ${item.delay}`}>
                    <div className="flex items-center gap-2 mb-3">
                    <item.icon className="w-4 h-4 text-actionsColor"/>
                    <span className="text-[10px] tracking-[0.3em] text-actionsColor uppercase font-sans">{item.label}</span>
                    </div>
                    <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">{item.description}</p>
                </div>
            ))}
        </div>
        
    )
};

export default HowItWorksCard