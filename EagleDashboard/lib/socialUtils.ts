import {
    FiLinkedin, FiTwitter, FiFacebook, FiInstagram, FiGithub, FiMail, FiGlobe, FiYoutube, FiMessageCircle
} from "react-icons/fi";
import {
    FaWhatsapp, FaDiscord, FaSlack, FaTiktok, FaSnapchat, FaReddit, FaPinterest, FaMedium, FaTelegram, FaSpotify,
    FaBehance, FaDribbble, FaTwitch, FaVimeo, FaSoundcloud, FaStackOverflow, FaGitlab, FaBitbucket
} from "react-icons/fa";
import { IconType } from "react-icons";

// Helper to normalize platform names
const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

export const getSocialIcon = (platform: string): IconType => {
    const p = normalize(platform);

    // Generic
    if (p.includes('mail') || p.includes('email')) return FiMail;
    if (p.includes('website') || p.includes('web') || p.includes('site')) return FiGlobe;

    // Major Socials
    if (p.includes('linkedin')) return FiLinkedin;
    if (p.includes('twitter') || p.includes('xcom') || p === 'x') return FiTwitter;
    if (p.includes('facebook') || p.includes('fb')) return FiFacebook;
    if (p.includes('instagram') || p.includes('insta')) return FiInstagram;
    if (p.includes('github') || p.includes('git')) return FiGithub;
    if (p.includes('youtube') || p.includes('yt')) return FiYoutube;

    // Messaging
    if (p.includes('whatsapp') || p.includes('wa')) return FaWhatsapp;
    if (p.includes('telegram')) return FaTelegram;
    if (p.includes('discord')) return FaDiscord;
    if (p.includes('slack')) return FaSlack;
    if (p.includes('messenger')) return FiMessageCircle;

    // Media / Content
    if (p.includes('tiktok')) return FaTiktok;
    if (p.includes('snapchat')) return FaSnapchat;
    if (p.includes('pinterest')) return FaPinterest;
    if (p.includes('reddit')) return FaReddit;
    if (p.includes('medium')) return FaMedium;
    if (p.includes('spotify')) return FaSpotify;
    if (p.includes('twitch')) return FaTwitch;
    if (p.includes('vimeo')) return FaVimeo;
    if (p.includes('soundcloud')) return FaSoundcloud;

    // Design / Dev
    if (p.includes('behance')) return FaBehance;
    if (p.includes('dribbble')) return FaDribbble;
    if (p.includes('stackoverflow')) return FaStackOverflow;
    if (p.includes('gitlab')) return FaGitlab;
    if (p.includes('bitbucket')) return FaBitbucket;

    // Fallback
    return FiGlobe;
};
