class ScrollDepthTracker {
    constructor(articleElement, scrollPercentTrackers) {
        this.scrollElement = articleElement;
        this.trackedScrollPoints = scrollPercentTrackers;
        this.scrollPointsHit = new Set();
        this.init();
    }

    init() {
        if (!this.scrollElement) {
            console.error('Article element not found!');
            return;
        }
        
        if (!this.trackedScrollPoints.length) {
            console.error('Track scroll depth points not found! Please provide at lease one point.');
            return;
        }

        window.addEventListener('scroll', () => this.trackScrollDepth());
    }

    trackScrollDepth() {
    	const articleHeight = this.scrollElement.offsetHeight;
    	const scrollPosition = window.scrollY + window.innerHeight;
        const scrollDepth = Math.min((scrollPosition / articleHeight) * 100, 100);

        this.trackedScrollPoints.forEach(point => {
            if (scrollDepth >= point && !this.scrollPointsHit.has(point)) {
                this.scrollPointsHit.add(point);
                this.dispatchScrollEvent(point);
            }
        });
    }

    dispatchScrollEvent(percentage) {
        const event = new CustomEvent('scrollDepthReached', {
            detail: { percentage }
        });
        window.dispatchEvent(event);
    }
}

// Usage
const articleElement = document.querySelector('.page-container');
const scrollDepthTracker = new ScrollDepthTracker(articleElement, [25, 50, 100]);

// Example listener to handle the scroll depth event
window.addEventListener('scrollDepthReached', (e) => {
    console.log(`You have reached ${e.detail.percentage}% of the article.`);
    alert(`You have reached ${e.detail.percentage}% of the article.`);
});
