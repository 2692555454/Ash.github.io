// 工具数据
const toolsData = {
    'AI写作工具': [
        { name: 'ChatGPT - 智能对话助手', url: 'https://chat.openai.com', desc: 'OpenAI开发的智能对话助手' },
        { name: 'Claude - 专业写作助手', url: 'https://claude.ai', desc: 'Anthropic开发的AI写作助手' },
        { name: 'Notion AI - 笔记智能助手', url: 'https://notion.ai', desc: '智能笔记和知识管理' },
        { name: 'Copy.ai - 营销文案生成', url: 'https://copy.ai', desc: '营销文案和内容创作' },
        { name: 'Jasper - 内容创作平台', url: 'https://jasper.ai', desc: '企业级内容创作工具' }
    ],
    'AI图像工具': [
        { name: 'Midjourney - AI绘画大师', url: 'https://midjourney.com', desc: '最强大的AI图像生成工具' },
        { name: 'Stable Diffusion - 开源AI绘画', url: 'https://stability.ai', desc: '开源图像生成模型' },
        { name: 'Leonardo AI - 创意图像生成', url: 'https://leonardo.ai', desc: '创意艺术图像生成' },
        { name: 'Runway ML - 视频图像处理', url: 'https://runwayml.com', desc: '多模态AI创作平台' },
        { name: 'DALL-E - OpenAI图像生成', url: 'https://dalle.openai.com', desc: 'OpenAI图像生成模型' }
    ],
    'AI视频工具': [
        { name: 'Synthesia - AI视频制作', url: 'https://synthesia.io', desc: 'AI数字人视频生成' },
        { name: 'HeyGen - 数字人视频', url: 'https://heygen.com', desc: '高质量数字人视频' },
        { name: 'Pika Labs - 文本生成视频', url: 'https://pika.art', desc: '文本到视频生成' },
        { name: 'Runway - 视频编辑AI', url: 'https://runwayml.com', desc: 'AI视频编辑工具' },
        { name: 'Fliki - 文字转视频', url: 'https://fliki.ai', desc: '文字转视频制作平台' }
    ],
    'AI编程工具': [
        { name: 'GitHub Copilot - 代码助手', url: 'https://github.com/copilot', desc: 'AI编程助手' },
        { name: 'Tabnine - AI代码补全', url: 'https://tabnine.com', desc: '智能代码补全工具' },
        { name: 'Cursor - 智能代码编辑器', url: 'https://cursor.sh', desc: 'AI驱动的代码编辑器' },
        { name: 'Replit - 在线编程平台', url: 'https://replit.com', desc: '云端开发环境' },
        { name: 'Codeium - 免费代码助手', url: 'https://codeium.com', desc: '免费AI代码助手' }
    ],
    'AI办公工具': [
        { name: 'Gamma - AI演示文稿', url: 'https://gamma.app', desc: '智能演示文稿制作' },
        { name: 'Tome - 智能文档创作', url: 'https://tome.app', desc: 'AI驱动的文档创作' },
        { name: 'Beautiful.ai - 智能PPT', url: 'https://beautiful.ai', desc: '智能幻灯片设计' },
        { name: 'Jenni AI - 学术写作', url: 'https://jenni.ai', desc: '学术论文写作助手' },
        { name: 'Otter.ai - 会议记录', url: 'https://otter.ai', desc: '智能会议记录' }
    ],
    'AI设计工具': [
        { name: 'Canva AI - 智能设计', url: 'https://canva.com/ai', desc: 'AI平面设计工具' },
        { name: 'Adobe Firefly - 创意套件', url: 'https://adobe.com/firefly', desc: 'Adobe创意AI工具' },
        { name: 'Khroma - AI配色方案', url: 'https://khroma.co', desc: '智能配色生成器' },
        { name: 'Uizard - UI设计助手', url: 'https://uizard.io', desc: 'UI设计AI助手' },
        { name: 'Fronty - 图像转代码', url: 'https://fronty.com', desc: '设计稿转代码工具' }
    ]
};

// 热门工具数据
const featuredTools = [
    {
        name: 'ChatGPT',
        url: 'https://chat.openai.com',
        desc: 'OpenAI开发的智能对话助手，支持多轮对话和复杂任务处理',
        icon: '🤖'
    },
    {
        name: 'Midjourney',
        url: 'https://midjourney.com',
        desc: '最强大的AI图像生成工具，创造令人惊叹的视觉艺术',
        icon: '🎨'
    },
    {
        name: 'GitHub Copilot',
        url: 'https://github.com/copilot',
        desc: 'AI编程助手，大幅提升开发效率和代码质量',
        icon: '💻'
    }
];

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initTooltips();
    initAnimations();
    updateVisitCount();
    
    // 根据页面类型初始化特定功能
    if (window.location.pathname.includes('resources.html')) {
        initResourcesPage();
    }
});

// 搜索功能
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // 显示所有工具
            document.querySelectorAll('.tools li').forEach(li => {
                li.style.display = 'block';
            });
            return;
        }
        
        // 搜索工具
        let foundAny = false;
        document.querySelectorAll('.tools li').forEach(li => {
            const text = li.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                li.style.display = 'block';
                foundAny = true;
                
                // 高亮匹配文本
                const link = li.querySelector('a');
                const originalText = link.textContent;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                link.innerHTML = originalText.replace(regex, '<mark>$1</mark>');
            } else {
                li.style.display = 'none';
            }
        });
        
        // 显示无结果提示
        const noResults = document.getElementById('noResults');
        if (!foundAny) {
            if (!noResults) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.id = 'noResults';
                noResultsDiv.style.textAlign = 'center';
                noResultsDiv.style.padding = '20px';
                noResultsDiv.style.color = '#666';
                noResultsDiv.innerHTML = `
                    <p>😢 没有找到包含"${searchTerm}"的工具</p>
                    <p>试试其他关键词，或者<a href="#" onclick="clearSearch()">查看所有工具</a></p>
                `;
                document.querySelector('.categories').after(noResultsDiv);
            }
        } else if (noResults) {
            noResults.remove();
        }
    });
    
    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
}

// 执行搜索
function performSearch(term) {
    if (term.trim()) {
        alert(`搜索: ${term}\n这是演示功能，实际网站可以连接到数据库搜索`);
    }
}

// 清空搜索
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
}

// 工具提示
function initTooltips() {
    const links = document.querySelectorAll('.tools a');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.href;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 30) + 'px';
            
            this._tooltip = tooltip;
        });
        
        link.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
            }
        });
    });
}

// 动画效果
function initAnimations() {
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有分类卡片
    document.querySelectorAll('.category').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// 访问计数
function updateVisitCount() {
    let visitCount = localStorage.getItem('ashSiteVisitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('ashSiteVisitCount', visitCount);
    
    const visitElement = document.createElement('div');
    visitElement.style.textAlign = 'center';
    visitElement.style.marginTop = '10px';
    visitElement.style.color = 'rgba(255,255,255,0.7)';
    visitElement.innerHTML = `👋 欢迎！本站已被访问 ${visitCount} 次`;
    
    document.querySelector('.footer').prepend(visitElement);
}

// 分享功能
function shareSite() {
    if (navigator.share) {
        navigator.share({
            title: 'Ash的小站 - AI工具导航',
            text: '发现超多好用的AI工具！',
            url: window.location.href
        });
    } else {
        alert('分享链接: ' + window.location.href);
    }
}

// 夜间模式切换
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// 检查并应用保存的主题
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Esc 清空搜索
    if (e.key === 'Escape') {
        clearSearch();
    }
});

// 资源页面特定功能
function initResourcesPage() {
    // 修改搜索框占位符
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = '搜索AI资源网站...';
    }
    
    // 添加资源网站统计
    const resourceCount = document.querySelectorAll('.tools li').length;
    const countElement = document.createElement('div');
    countElement.style.textAlign = 'center';
    countElement.style.margin = '20px 0';
    countElement.style.color = '#667eea';
    countElement.style.fontWeight = 'bold';
    countElement.innerHTML = `📚 共收录 ${resourceCount} 个AI资源网站`;
    
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.after(countElement);
    }
}

// 增强搜索功能 - 支持多页面
function enhanceSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    // 根据页面类型设置不同的搜索提示
    if (window.location.pathname.includes('resources.html')) {
        searchInput.placeholder = '搜索AI资源网站、导航平台...';
    } else {
        searchInput.placeholder = '搜索AI工具、应用、平台...';
    }
}