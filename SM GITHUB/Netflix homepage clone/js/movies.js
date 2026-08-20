// Navbar Scroll Effect (Black background on scroll)
window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 50) {
        nav.classList.add("bg-[#141414]");
        nav.classList.remove("bg-transparent", "bg-gradient-to-b");
    } else {
        nav.classList.remove("bg-[#141414]");
        nav.classList.add("bg-gradient-to-b");
    }
});

// Movie Data (Using high-quality posters)
const rowsData = [
    { title: "Netflix Originals", type: "portrait", images: [
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    ]},
    { title: "Trending Now", type: "landscape", images: [
        "https://images.unsplash.com/photo-1535016120720-40c746a46366?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=500&h=280&fit=crop",
    ]},
    { title: "Action & Adventure", type: "landscape", images: [
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=280&fit=crop",
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=280&fit=crop",
    ]}
];

function loadMovies() {
    const container = document.getElementById("movie-container");
    
    rowsData.forEach(row => {
        const isPortrait = row.type === "portrait";
        const widthClass = isPortrait ? "w-[150px] md:w-[200px]" : "w-[200px] md:w-[280px]";
        const heightClass = isPortrait ? "h-[225px] md:h-[300px]" : "h-[110px] md:h-[160px]";

        let cardsHtml = row.images.map(img => `
            <div class="flex-none ${widthClass} ${heightClass} movie-card cursor-pointer rounded-md overflow-hidden relative">
                <img src="${img}" class="w-full h-full object-cover rounded-md" alt="Movie">
            </div>
        `).join('');

        const rowHtml = `
            <div class="mb-8">
                <h2 class="text-white text-xl md:text-2xl font-bold mb-3 ml-12 drop-shadow-md">${row.title}</h2>
                <div class="flex gap-2 overflow-x-auto hide-scroll px-12 pb-8 pt-2">
                    ${cardsHtml}
                </div>
            </div>
        `;
        container.innerHTML += rowHtml;
    });
}

// Load movies when DOM is ready
document.addEventListener("DOMContentLoaded", loadMovies);