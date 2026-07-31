// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="preface.html"><strong aria-hidden="true">1.</strong> 한국어판을 읽는 법</a></li><li class="chapter-item expanded "><a href="ch01-harness.html"><strong aria-hidden="true">2.</strong> 1장: 98.4% 하니스와 1.6% 판단</a></li><li class="chapter-item expanded "><a href="ch02-architecture.html"><strong aria-hidden="true">3.</strong> 2장: 다섯 계층과 하나의 에이전트 루프</a></li><li class="chapter-item expanded "><a href="ch03-values.html"><strong aria-hidden="true">4.</strong> 3장: 가치에서 구현까지</a></li><li class="chapter-item expanded "><a href="ch04-safety.html"><strong aria-hidden="true">5.</strong> 4장: 권한과 심층 방어</a></li><li class="chapter-item expanded "><a href="ch05-context.html"><strong aria-hidden="true">6.</strong> 5장: 컨텍스트는 가장 희소한 자원이다</a></li><li class="chapter-item expanded "><a href="ch06-extensibility.html"><strong aria-hidden="true">7.</strong> 6장: 네 가지 확장 메커니즘</a></li><li class="chapter-item expanded "><a href="ch07-subagents.html"><strong aria-hidden="true">8.</strong> 7장: 서브에이전트와 격리</a></li><li class="chapter-item expanded "><a href="ch08-session.html"><strong aria-hidden="true">9.</strong> 8장: 세션, 메모리와 재개</a></li><li class="chapter-item expanded "><a href="ch09-build-your-own.html"><strong aria-hidden="true">10.</strong> 9장: 나만의 에이전트를 설계하는 질문</a></li><li class="chapter-item expanded "><a href="ch10-sources.html"><strong aria-hidden="true">11.</strong> 10장: 연구의 한계와 후속 자료</a></li><li class="chapter-item expanded "><a href="attribution.html"><strong aria-hidden="true">12.</strong> 출처·저작자·라이선스</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
