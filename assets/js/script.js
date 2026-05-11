const translations = {
    en: {
        nav_overview: "Overview",
        nav_features: "Features",
        nav_deployment: "Deployment",
        nav_connect: "Connect Bot",
        hero_subtitle: "Advanced WhatsApp AI Bot Core Engine",
        deploy_btn: "Deploy Now",
        connect_btn: "Connect Bot",
        overview_title: "Overview",
        overview_text: "<strong>CIPTER-MD</strong> is a high-performance, multi-functional WhatsApp AI bot built by <strong>sh4lu_z</strong>. It integrates advanced AI models and powerful modules to deliver a seamless automated experience with over 100+ commands.",
        features_title: "Key Features",
        feature_ai_title: "AI Intelligence",
        feature_ai_text: "Smart AI integration (Machan AI), advanced message filters, and automated anti-call systems.",
        feature_media_title: "Media Engine",
        feature_media_text: "Download Songs/Videos, manipulate images, and utilize the built-in Audio Studio.",
        feature_group_title: "Group Controls",
        feature_group_text: "Automated Welcome/Bye messages, ranking systems, and advanced admin commands.",
        feature_sec_title: "Security & Recovery",
        feature_sec_text: "ViewOnce (VO) media recovery and comprehensive WhatsApp security scanning.",
        feature_bday_title: "Automated Reminders",
        feature_bday_text: "Built-in Birthday Logic to remember and automatically send wishes to your contacts.",
        feature_100_title: "100+ Commands",
        feature_100_text: "A massive library of over 100+ advanced commands, covering everything from utilities to fun mini-games!",
        auto_deploy_title: "Auto Deployment",
        guide_title: "Deployment Guide",
        guide_subtitle: "Follow these steps carefully",
        step1_title: "1. Fork the Repository",
        step1_desc: "First, you must fork the source code. This creates a copy of the bot in your own GitHub account so you can deploy it.",
        step2_title: "2. Get Your Session ID",
        step2_desc: "Go to our 'Connect Bot' page and link your WhatsApp. This generates a unique SESSION_ID needed to run the bot.",
        step3_title: "3. Choose a Platform",
        step3_desc: "Click one of the official buttons above (Heroku, Koyeb, etc.) to start the automated deployment process.",
        step4_title: "4. Configure Variables",
        step4_desc: "Enter your SESSION_ID and other required settings in the platform's Environment Variables section.",
        step5_title: "5. Deploy & Connect",
        step5_desc: "Click 'Deploy' and wait. Your bot will come online and connect to your WhatsApp automatically!",
        env_title: "Environment Variables",
        guide_subtitle: "Step-by-step instructions",
        step1_title: "Fork the Repository:",
        step1_desc: "First, fork the official CIPTER-MD repository to your own GitHub account.",
        step2_title: "Get Session ID:",
        step2_desc: "Use our 'Connect Bot' page to scan the QR code or use a Pairing Code to generate your unique SESSION_ID.",
        step3_title: "Connect Platform:",
        step3_desc: "Click one of the Auto Deploy buttons above (e.g., Koyeb) and link your GitHub account.",
        step4_title: "Configure Variables:",
        step4_desc: "Copy the necessary variables from the Environment Variables section below and paste them into your deployment dashboard.",
        step5_title: "Deploy & Enjoy:",
        step5_desc: "Click 'Deploy', wait for the build process to complete, and your bot will come online!",
        env_title: "Environment Variables",
        env_subtitle: "Required Configuration (.env)",
        env_desc: "Configure these variables in your deployment platform (Koyeb/Heroku/Railway) before starting the bot.",
        manual_title: "Manual Deployment",
        manual_subtitle: "For Advanced Users & VPS Hosting",
        method_node_title: "Node.js Method",
        method_node_desc: "Recommended for local testing and standard Linux VPS hosting.",
        method_docker_title: "Docker Method",
        method_docker_desc: "Recommended for high stability and isolated container environments.",
        deployment_title: "Manual Deployment",
        deployment_subtitle: "(Docker Method)",
        deploy_prereq: "Prerequisites",
        deploy_req1: "Docker & Docker Compose installed on your system.",
        deploy_setup: "Setup & Run",
        lang_btn: "සිංහල",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",
        nav_home: "Home",
        policy_title: "Privacy Policy",
        policy_date: "Last updated: May 2026",
        policy_h1: "1. Information Collection",
        policy_p1: "We do not collect any personally identifiable information unless you explicitly provide it. The bot processes messages directly on your deployment environment.",
        policy_h2: "2. Use of Data",
        policy_p2: "Any data processed by CIPTER-MD (such as commands, numbers, or session data) is strictly used for executing the requested commands. We do not store or sell your data to third parties.",
        policy_h3: "3. Local Deployment",
        policy_p3: "Because CIPTER-MD is a core engine that you deploy on your own infrastructure (Koyeb, Heroku, Docker), you retain full ownership and responsibility over the data it handles.",
        policy_h4: "4. Contact Us",
        policy_p4: "If you have any questions about this Privacy Policy, please contact the author via the official repository.",
        terms_title: "Terms of Service",
        terms_date: "Last updated: May 2026",
        terms_h1: "1. Acceptance of Terms",
        terms_p1: "By deploying or using the CIPTER-MD engine, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the software.",
        terms_h2: "2. Acceptable Use",
        terms_p2: "You agree to use the bot in compliance with WhatsApp's official Terms of Service. You are strictly prohibited from using the bot for:",
        terms_l1: "Spamming or sending unsolicited messages",
        terms_l2: "Distributing malicious content or malware",
        terms_l3: "Harassing or violating the rights of others",
        terms_h3: "3. Disclaimer of Warranty",
        terms_p3: "The software is provided \"as is\", without warranty of any kind. The author (sh4lu_z) is not responsible for any account bans or damages caused by the use of this software.",
        terms_h4: "4. Modifications",
        terms_p4: "We reserve the right to modify or replace these terms at any time. Continued use of the software constitutes acceptance of the new terms.",
        footer_desc: "Advanced WhatsApp AI Bot Core Engine. Built for performance, security, and seamless automation.",
        footer_links: "QUICK LINKS",
        nav_updates: "Updates & Changelog",
        footer_connect: "CONNECT",
        updates_title: "Changelog",
        updates_subtitle: "Latest updates and improvements",
        update_date_2: "May 2026",
        update_2_1: "Completely redesigned Web Interface with Glassmorphism.",
        update_2_2: "Added Web Pairing functionality and QR Code generation.",
        update_2_3: "Improved AI response times for Machan AI.",
        update_2_4: "Added 100+ new commands covering OSINT & Utilities.",
        update_date_1_5: "March 2026",
        update_15_1: "Introduced ViewOnce (VO) Recovery engine.",
        update_15_2: "Patched a bug where media downloads failed on WhatsApp Web.",
        update_15_3: "Added Auto Birthday Wisher logic.",
        update_date_1: "January 2026",
        update_1_1: "Initial release of CIPTER-MD Core.",
        update_1_2: "Basic WhatsApp socket connection and ping commands.",
        connect_title: "Link WhatsApp Bot",
        connect_subtitle: "Secure Session Bridge",
        tab_pair: "PAIR CODE",
        tab_qr: "QR SCAN",
        pair_instruction: "Select country & enter your phone number.",
        get_code_btn: "Get Pairing Code",
        connecting: "Connecting...",
        your_code: "Your Pairing Code:",
        code_instruction: "Enter this code on your WhatsApp linked devices screen.",
        qr_click_start: "Click Start to Generate",
        qr_loading: "Loading QR...",
        qr_start_btn: "START SYNC",
        success_msg: "✅ Session Connected Successfully!",
        toast_invalid: "Invalid phone number!",
        toast_req_code: "Requesting Pairing Code...",
        toast_received: "Code Received! Click to Copy.",
        toast_copied: "Code copied to clipboard!",
        toast_error: "Server Error",
        toast_success: "Session Connected!",
        toast_connecting_sync: "Connecting to sync...",
        toast_scan_qr: "Scan this QR Code via WhatsApp"
    },
    si: {
        nav_overview: "දළ විශ්ලේෂණය",
        nav_features: "විශේෂාංග",
        nav_deployment: "ස්ථාපනය",
        nav_connect: "බොට් සම්බන්ධ කරන්න",
        hero_subtitle: "උසස් WhatsApp AI Bot Core එන්ජිම",
        deploy_btn: "දැන් ස්ථාපනය කරන්න",
        connect_btn: "බොට් සම්බන්ධ කරන්න",
        overview_title: "දළ විශ්ලේෂණය",
        overview_text: "<strong>CIPTER-MD</strong> යනු <strong>sh4lu_z</strong> විසින් නිර්මාණය කරන ලද ඉහළ කාර්යසාධනයක් සහිත බහුකාර්ය WhatsApp AI බොට් එකකි. Commands 100 කට අධික ප්‍රමාණයක් සමගින් සියලුම පහසුකම් වලින් සමන්විත වේ.",
        features_title: "ප්‍රධාන විශේෂාංග",
        feature_ai_title: "AI බුද්ධිය",
        feature_ai_text: "Machan AI, Smart Filters, සහ ස්වයංක්‍රීයව calls කට් කරන Anti-Call පද්ධතිය.",
        feature_media_title: "මාධ්‍ය සහ සංස්කරණ",
        feature_media_text: "සින්දු/Videos ඩවුන්ලෝඩ් කිරීම, පින්තූර සංස්කරණය සහ Audio Studio පහසුකම්.",
        feature_group_title: "Group පාලනය",
        feature_group_text: "Welcome/Bye පණිවිඩ, Group එකේ Ranking ක්‍රමයක් සහ Admin පහසුකම්.",
        feature_sec_title: "ආරක්ෂාව සහ Recovery",
        feature_sec_text: "ViewOnce (VO) පණිවිඩ ආපසු ලබාගැනීම සහ WhatsApp ආරක්ෂක ස්කෑන් කිරීම්.",
        feature_bday_title: "ස්වයංක්‍රීය උපන්දින",
        feature_bday_text: "මිතුරන්ගේ උපන්දින මතක තබාගෙන ස්වයංක්‍රීයව සුබපැතුම් යැවීමේ පහසුකම.",
        feature_100_title: "100+ විධාන",
        feature_100_text: "ඔබට අවශ්‍ය සියලුම දේවල් කරගැනීම සඳහා සාදන ලද විශේෂිත විධාන (Commands) 100 කට අධික ප්‍රමාණයක් මේ තුළ ඇත.",
        auto_deploy_title: "ස්වයංක්‍රීය ස්ථාපනය (Auto Deploy)",
        guide_title: "ස්ථාපනය කරන ආකාරය",
        guide_subtitle: "පහත පියවරවල් නිවැරදිව අනුගමනය කරන්න",
        step1_title: "1. Repository එක Fork කරගන්න",
        step1_desc: "බොට්ව ස්ථාපනය කිරීමට පෙර, මෙහි ඇති 'Fork' බොත්තම ඔබා මෙහි code එක ඔබගේම GitHub ගිණුමට පිටපත් කරගත යුතුය.",
        step2_title: "2. Session ID එක ලබාගන්න",
        step2_desc: "අපගේ 'Connect Bot' පිටුවට ගොස් ඔබගේ WhatsApp සම්බන්ධ කරන්න. එවිට ඔබට ලැබෙන SESSION_ID එක සුරැකිව තබාගන්න.",
        step3_title: "3. සේවාවක් තෝරාගන්න",
        step3_desc: "ඉහත ඇති ඕනෑම official deploy බොත්තමක් (Heroku, Koyeb, Railway) ඔබා බොට්ව ස්ථාපනය කිරීම අරඹන්න.",
        step4_title: "4. විචල්‍යයන් (Variables) ඇතුළත් කරන්න",
        step4_desc: "එහිදී අසනු ලබන Settings වලට ඔබ ලබාගත් SESSION_ID එක සහ අනෙකුත් අවශ්‍ය දේවල් නිවැරදිව ලබාදෙන්න.",
        step5_title: "5. Deploy කර අවසන් කරන්න",
        step5_desc: "අවසානයේ 'Deploy' බොත්තම ඔබා මද වේලාවක් රැඳී සිටින්න. එවිට ඔබගේ බොට් WhatsApp සමග ස්වයංක්‍රීයව සම්බන්ධ වනු ඇත!",
        env_title: "පරිසර විචල්‍යයන් (ENV)",
        env_subtitle: "අවශ්‍ය සැකසුම් (.env)",
        env_desc: "බොට්ව ක්‍රියාත්මක කිරීමට පෙර, අදාළ Deployment වේදිකාවේ (Koyeb/Heroku) මෙම විචල්‍යයන් (Variables) සකසන්න.",
        manual_title: "සාමාන්‍ය ස්ථාපනය (Manual)",
        manual_subtitle: "VPS සහ උසස් පරිශීලකයින් සඳහා",
        method_node_title: "Node.js ක්‍රමය",
        method_node_desc: "Local testing සහ සාමාන්‍ය Linux VPS වල ස්ථාපනය කිරීමට මෙය වඩාත් සුදුසුයි.",
        method_docker_title: "Docker ක්‍රමය",
        method_docker_desc: "ඉහළ ස්ථායීතාවයක් සහ ආරක්ෂිත container පරිසරයක් අවශ්‍ය අයට මෙය වඩාත් සුදුසුයි.",
        deployment_title: "සාමාන්‍ය ස්ථාපනය",
        deployment_subtitle: "(Docker ක්‍රමය)",
        deploy_prereq: "අවශ්‍යතා",
        deploy_req1: "Docker සහ Docker Compose ස්ථාපනය කර තිබීම.",
        deploy_setup: "ස්ථාපනය සහ ක්‍රියාත්මක කිරීම",
        lang_btn: "English",
        footer_privacy: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
        footer_terms: "සේවා කොන්දේසි",
        nav_home: "මුල් පිටුව",
        policy_title: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
        policy_date: "අවසන් යාවත්කාලීන කිරීම: මැයි 2026",
        policy_h1: "1. තොරතුරු රැස් කිරීම",
        policy_p1: "අපි කිසිදු පෞද්ගලික තොරතුරක් රැස් නොකරමු. බොට් ක්‍රියාත්මක වන්නේ ඔබගේම සේවාදායකයේ (server) පමණි.",
        policy_h2: "2. දත්ත භාවිතය",
        policy_p2: "මෙම බොට් මගින් ලබාගන්නා දුරකථන අංක හෝ වෙනත් දත්ත අදාළ විධානය ක්‍රියාත්මක කිරීමට පමණක් යොදා ගැනේ. කිසිදු දත්තයක් තෙවන පාර්ශවයකට විකුණන්නේ හෝ ගබඩා කරන්නේ නැත.",
        policy_h3: "3. ඔබගේ පාලනය",
        policy_p3: "මෙය ඔබ විසින්ම ස්ථාපනය කරගන්නා බැවින් (Koyeb, Heroku), සියලුම දත්තවල සම්පූර්ණ අයිතිය සහ වගකීම ඔබ සතු වේ.",
        policy_h4: "4. අපව සම්බන්ධ කරගැනීම",
        policy_p4: "මේ සම්බන්ධව ගැටලුවක් ඇත්නම්, අපගේ නිල Github පිටුව හරහා සම්බන්ධ විය හැක.",
        terms_title: "සේවා කොන්දේසි",
        terms_date: "අවසන් යාවත්කාලීන කිරීම: මැයි 2026",
        terms_h1: "1. කොන්දේසි පිළිගැනීම",
        terms_p1: "CIPTER-MD භාවිතා කිරීමෙන් ඔබ මෙම කොන්දේසි වලට එකඟ වේ. ඔබ එකඟ නොවන්නේ නම්, කරුණාකර මෙය භාවිතා නොකරන්න.",
        terms_h2: "2. භාවිතය සීමා කිරීම",
        terms_p2: "WhatsApp හි නිල නීති වලට අනුකූලව මෙය භාවිතා කළ යුතුය. පහත දෑ සඳහා මෙය භාවිතා කිරීම සපුරා තහනම් වේ:",
        terms_l1: "ස්පෑම් පණිවිඩ (Spam messages) යැවීම",
        terms_l2: "වෛරස් හෝ අනතුරුදායක දේවල් බෙදා හැරීම",
        terms_l3: "අන් අයට හිරිහැර කිරීම හෝ නීති විරෝධී ක්‍රියා",
        terms_h3: "3. වගකීම් සීමාව",
        terms_p3: "මෙම මෘදුකාංගය කිසිදු වගකීමක් නොමැතිව ලබා දේ. ඔබගේ WhatsApp ගිණුම තහනම් (Ban) වුවහොත් කතුවරයා (sh4lu_z) ඒ සඳහා වගකියන්නේ නැත.",
        terms_h4: "4. වෙනස්කම් කිරීම",
        terms_p4: "ඕනෑම අවස්ථාවක මෙම කොන්දේසි වෙනස් කිරීමේ අයිතිය අප සතුය. දිගටම භාවිතා කිරීමෙන් ඔබ එම අලුත් කොන්දේසි වලටත් එකඟ වේ.",
        footer_desc: "ඉහළම කාර්යසාධනයක් සහ ආරක්ෂාවක් සහිතව නිර්මාණය කළ WhatsApp AI බොට් එන්ජිම.",
        footer_links: "ඉක්මන් සබැඳි",
        nav_updates: "අලුත් වෙනස්කම්",
        footer_connect: "සම්බන්ධ වන්න",
        updates_title: "අලුත් වෙනස්කම් (Changelog)",
        updates_subtitle: "මෑත කාලීන යාවත්කාලීන කිරීම්",
        update_date_2: "මැයි 2026",
        update_2_1: "Glassmorphism මෝස්තරයෙන් සම්පූර්ණයෙන්ම අලුත් කළ වෙබ් අතුරුමුහුණත.",
        update_2_2: "බොට්ව Web එක හරහා QR එකකින් හෝ කෝඩ් එකකින් සම්බන්ධ කිරීමේ පහසුකම.",
        update_2_3: "Machan AI සඳහා වඩාත් වේගවත් ප්‍රතිචාර ලබාදීම.",
        update_2_4: "අලුත් Commands 100කට වඩා එක් කිරීම.",
        update_date_1_5: "මාර්තු 2026",
        update_15_1: "ViewOnce (VO) පණිවිඩ නැවත ලබාගැනීමේ පහසුකම එක් කිරීම.",
        update_15_2: "WhatsApp Web වලදී මාධ්‍ය බාගත කිරීමේ දෝෂයක් නිවැරදි කිරීම.",
        update_15_3: "ස්වයංක්‍රීයව උපන්දින සුබපැතුම් යැවීමේ පහසුකම.",
        update_date_1: "ජනවාරි 2026",
        update_1_1: "CIPTER-MD හි පළමු නිකුතුව.",
        update_1_2: "මූලික WhatsApp සබැඳුම සහ Ping විධාන එක් කිරීම.",
        connect_title: "WhatsApp බොට් සම්බන්ධ කරන්න",
        connect_subtitle: "ආරක්ෂිත සැසියක් අරඹන්න",
        tab_pair: "PAIR CODE එක",
        tab_qr: "QR ස්කෑන්",
        pair_instruction: "රට තෝරා ඔබගේ දුරකථන අංකය ඇතුලත් කරන්න.",
        get_code_btn: "Pairing Code එක ගන්න",
        connecting: "සම්බන්ධ වෙමින් පවතී...",
        your_code: "ඔබගේ Pairing Code එක:",
        code_instruction: "මෙම කේතය ඔබගේ WhatsApp linked devices තිරයේ ඇතුලත් කරන්න.",
        qr_click_start: "Start බොත්තම ඔබන්න",
        qr_loading: "QR එක ලෝඩ් වෙමින් පවතී...",
        qr_start_btn: "සම්බන්ධ කිරීම අරඹන්න",
        success_msg: "✅ සාර්ථකව සම්බන්ධ විය!",
        toast_invalid: "ඔබ ඇතුලත් කළ දුරකථන අංකය වැරදියි!",
        toast_req_code: "Pairing Code එක ඉල්ලුම් කරමින්...",
        toast_received: "Code එක ලැබුණා! කොපි කරගන්න.",
        toast_copied: "Pairing Code එක කොපි කරගත්තා!",
        toast_error: "සර්වර් දෝෂයකි",
        toast_success: "සාර්ථකව සම්බන්ධ විය!",
        toast_connecting_sync: "සර්වර් එකට සම්බන්ධ වෙමින්...",
        toast_scan_qr: "WhatsApp මගින් මෙම QR කේතය ස්කෑන් කරන්න"
    }
};

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    function reveal() {
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);
    reveal();

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if(navLinks.classList.contains('active')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'si' : 'en';
            updateLanguage();
            // Update body font for sinhala if needed
            if (currentLang === 'si') {
                document.body.classList.add('sinhala-font');
            } else {
                document.body.classList.remove('sinhala-font');
            }
        });
    }

    function updateLanguage() {
        const texts = document.querySelectorAll('[data-key]');
        texts.forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
        if (langBtn) {
            langBtn.textContent = translations[currentLang].lang_btn;
        }
    }
});
