// @ts-nocheck
import React, { useState } from 'react';
import { Sparkles, Shuffle, Check, X, Palette, User, RefreshCw, Shirt, Smile, Scissors, Layers, Link as LinkIcon } from 'lucide-react';

// ==========================================
// 1. ASSET IMPORTS
// ==========================================

// --- Body + Outfits ---
import outfitBaseElection from './assets/Idol character/Body+outfit/General Election outfit base.webp';
import outfitCenterElection from './assets/Idol character/Body+outfit/General Election outfit center.webp';
import outfit1 from './assets/Idol character/Body+outfit/Outfit 1.webp';
import outfit2 from './assets/Idol character/Body+outfit/Outfit 2.webp';
import outfit3 from './assets/Idol character/Body+outfit/outfit 3.webp';
import outfit4 from './assets/Idol character/Body+outfit/outfit 4.webp';
import outfit5 from './assets/Idol character/Body+outfit/outfit 5.webp';
import outfit7 from './assets/Idol character/Body+outfit/outfit 7.webp';
import outfit8 from './assets/Idol character/Body+outfit/outfit 8.webp';
import outfit9 from './assets/Idol character/Body+outfit/outfit 9.webp';
import outfit10 from './assets/Idol character/Body+outfit/outfit 10.webp';
import outfit11 from './assets/Idol character/Body+outfit/outfit 11.webp';
import outfit12 from './assets/Idol character/Body+outfit/outfit 12.webp';
import outfit13 from './assets/Idol character/Body+outfit/outfit 13.webp';
import outfit14 from './assets/Idol character/Body+outfit/outfit 14.webp';
import outfit15 from './assets/Idol character/Body+outfit/outfit 15.webp';
import outfit16 from './assets/Idol character/Body+outfit/outfit 16.webp';

// --- Faces ---
import face1 from './assets/Idol character/Face/Face 1.webp';
import face2 from './assets/Idol character/Face/Face 2.webp';
import face3 from './assets/Idol character/Face/face 3.webp';
import face4 from './assets/Idol character/Face/face 4.webp';
import face5 from './assets/Idol character/Face/face 5.webp';
import face6 from './assets/Idol character/Face/face 6.webp';
import face7 from './assets/Idol character/Face/face 7.webp';

// --- Hats / Head Accessories ---
import electionWinnerHat from './assets/Idol character/Hat/Election winner Hat.webp';
import kami7Hat1 from './assets/Idol character/Hat/kami 7 hat 1.webp';
import kami7Hat2 from './assets/Idol character/Hat/kami 7 hat 2.webp';
import kami7Hat3 from './assets/Idol character/Hat/kami 7 hat 3.webp';

// ==========================================
// 2. HAIR GLOB IMPORTS (12 STYLES x 8 COLORS)
// ==========================================
const hairFrontGlob = import.meta.glob('./assets/Idol character/hair/*/*/front.webp', { eager: true, import: 'default' });
const hairBackGlob = import.meta.glob('./assets/Idol character/hair/*/*/back.webp', { eager: true, import: 'default' });

export const HAIR_COLORS = [
    { id: '_black', name: 'Jet Black', hex: '#27272A' },
    { id: '_blonde', name: 'Golden Blonde', hex: '#FACC15' },
    { id: '_brown', name: 'Warm Chestnut', hex: '#854D0E' },
    { id: '_darkbrown', name: 'Dark Espresso', hex: '#3F2E23' },
    { id: '_lavender', name: 'Pastel Lavender', hex: '#C084FC' },
    { id: '_lightblonde', name: 'Platinum Blonde', hex: '#FEF08A' },
    { id: '_rosegold', name: 'Rose Gold Pink', hex: '#F472B6' },
    { id: '_softgreen', name: 'Mint Green', hex: '#86EFAC' },
];

export const HAIR_STYLES = Array.from({ length: 12 }, (_, i) => {
    const numStr = String(i + 1).padStart(3, '0');
    return {
        id: `hair_${numStr}`,
        name: `Style #${i + 1}`,
    };
});

/**
 * Resolves front and back hair assets with independent mix-and-match front & back styles
 * sharing the exact same unified color.
 */
export const getHairAssets = (frontStyleId?: string, backStyleId?: string, colorId?: string) => {
    const safeFrontStyle = frontStyleId || 'hair_001';
    const safeBackStyle = backStyleId || frontStyleId || 'hair_001';
    const safeColor = colorId || '_black';

    // Vite glob paths: ./assets/Idol character/hair/hair_001/_black/front.webp
    const frontPath = `./assets/Idol character/hair/${safeFrontStyle}/${safeColor}/front.webp`;
    const backPath = `./assets/Idol character/hair/${safeBackStyle}/${safeColor}/back.webp`;

    const front = hairFrontGlob[frontPath] || Object.values(hairFrontGlob)[0];
    const back = hairBackGlob[backPath] || Object.values(hairBackGlob)[0];

    return { front, back };
};

// ==========================================
// 3. CATALOG DEFINITIONS
// ==========================================

export const AVATAR_OUTFITS = [
    { id: 'outfit_1', name: 'Classic Stage Uniform', tag: 'Stage', src: outfit1 },
    { id: 'outfit_2', name: 'Pastel Idol Costume', tag: 'Concert', src: outfit2 },
    { id: 'outfit_3', name: 'Cherry Blossom Dress', tag: 'Seasonal', src: outfit3 },
    { id: 'outfit_4', name: 'Midnight Velvet Robe', tag: 'Elegant', src: outfit4 },
    { id: 'outfit_5', name: 'Cyber Neon Unit', tag: 'Futuristic', src: outfit5 },
    { id: 'outfit_7', name: 'Royal Crimson Set', tag: 'Royal', src: outfit7 },
    { id: 'outfit_8', name: 'Sky Marine Sailor', tag: 'Fresh', src: outfit8 },
    { id: 'outfit_9', name: 'Golden Senbatsu Suit', tag: 'Prestige', src: outfit9 },
    { id: 'outfit_10', name: 'Starlight Prism Gown', tag: 'Dazzling', src: outfit10 },
    { id: 'outfit_11', name: 'Cute Strawberry Tart', tag: 'Sweet', src: outfit11 },
    { id: 'outfit_12', name: 'Emerald Symphony', tag: 'Harmonic', src: outfit12 },
    { id: 'outfit_13', name: 'Gothic Lolita Ribbon', tag: 'Gothic', src: outfit13 },
    { id: 'outfit_14', name: 'Diamond Mirage', tag: 'Luxe', src: outfit14 },
    { id: 'outfit_15', name: 'Sunflower Sunshine', tag: 'Summer', src: outfit15 },
    { id: 'outfit_16', name: 'Aurora Fantasy', tag: 'Fantasy', src: outfit16 },
];

export const ELECTION_OUTFITS = {
    base: { id: 'election_base', name: 'General Election Base Uniform', tag: 'Election', src: outfitBaseElection },
    center: { id: 'election_center', name: 'General Election Kami 7 / Center Dress', tag: 'Election Special', src: outfitCenterElection },
};

export const AVATAR_FACES = [
    { id: 'face_1', name: 'Sweet Smile', tag: 'Cheerful', src: face1 },
    { id: 'face_2', name: 'Sparkling Idol', tag: 'Confident', src: face2 },
    { id: 'face_3', name: 'Gentle Grin', tag: 'Warm', src: face3 },
    { id: 'face_4', name: 'Playful Wink', tag: 'Energetic', src: face4 },
    { id: 'face_5', name: 'Cool Gaze', tag: 'Charismatic', src: face5 },
    { id: 'face_6', name: 'Joyful Laugh', tag: 'Radiant', src: face6 },
    { id: 'face_7', name: 'Serene Beauty', tag: 'Elegant', src: face7 },
];

export const AVATAR_HATS = [
    { id: 'none', name: 'No Headwear', tag: 'Standard', src: null },
    { id: 'election_winner_hat', name: 'Election Winner Crown', tag: 'Election #1', src: electionWinnerHat, isElectionOnly: true },
    { id: 'kami7_hat_1', name: 'Kami 7 Tiara (Style 1)', tag: 'Kami 7', src: kami7Hat1, isElectionOnly: true },
    { id: 'kami7_hat_2', name: 'Kami 7 Headdress (Style 2)', tag: 'Kami 7', src: kami7Hat2, isElectionOnly: true },
    { id: 'kami7_hat_3', name: 'Kami 7 Ribbon Mini-Hat (Style 3)', tag: 'Kami 7', src: kami7Hat3, isElectionOnly: true },
];

export interface IdolAppearance {
    outfitId: string;
    faceId: string;
    hairFrontStyleId: string;
    hairBackStyleId: string;
    hairColorId: string;
    hairStyleId?: string; // legacy fallback
    hatId?: string;
}

/**
 * Deterministic or assigned character appearance resolver.
 * Supports independent front & back hairstyles combined with a unified shared color.
 */
export const getMemberAppearance = (member: any): IdolAppearance => {
    if (member?.appearance?.outfitId && member?.appearance?.faceId && member?.appearance?.hairColorId) {
        return {
            outfitId: member.appearance.outfitId,
            faceId: member.appearance.faceId,
            hairFrontStyleId: member.appearance.hairFrontStyleId || member.appearance.hairStyleId || 'hair_001',
            hairBackStyleId: member.appearance.hairBackStyleId || member.appearance.hairStyleId || 'hair_001',
            hairColorId: member.appearance.hairColorId,
            hatId: member.appearance.hatId || 'none',
        };
    }

    // Support legacy appearances gracefully
    if (member?.appearance?.hairId) {
        const oldHair = String(member.appearance.hairId);
        let style = 'hair_001';
        let color = '_blonde';
        if (oldHair.includes('sakura') || oldHair.includes('green')) {
            style = 'hair_002';
            color = oldHair.includes('green') ? '_softgreen' : '_blonde';
        }
        return {
            outfitId: member.appearance.outfitId || AVATAR_OUTFITS[0].id,
            faceId: member.appearance.faceId || AVATAR_FACES[0].id,
            hairFrontStyleId: style,
            hairBackStyleId: style,
            hairColorId: color,
            hatId: member.appearance.hatId || 'none',
        };
    }

    const key = String(member?.rosterId || member?.id || member?.name || '1');
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash << 5) - hash + key.charCodeAt(i);
        hash |= 0;
    }
    const seed = Math.abs(hash);

    const outfit = AVATAR_OUTFITS[seed % AVATAR_OUTFITS.length];
    const face = AVATAR_FACES[(seed * 3) % AVATAR_FACES.length];
    const frontStyle = HAIR_STYLES[(seed * 7) % HAIR_STYLES.length];
    const backStyle = HAIR_STYLES[(seed * 13) % HAIR_STYLES.length];
    const color = HAIR_COLORS[(seed * 11) % HAIR_COLORS.length];

    return {
        outfitId: outfit.id,
        faceId: face.id,
        hairFrontStyleId: frontStyle.id,
        hairBackStyleId: backStyle.id,
        hairColorId: color.id,
        hatId: 'none',
    };
};

/**
 * Helper to resolve election accessory and outfit strictly based on election ranking:
 * - Rank 1: Winner Crown + Center/Kami7 Election Dress
 * - Rank 2-7: Kami 7 Hat (Style 1/2/3) + Center/Kami7 Election Dress
 * - Rank 8+: No Hat + Base Election Dress
 */
export const getElectionExclusiveLook = (rank?: number, seedKey?: string | number) => {
    if (!rank || rank <= 0) return null;

    if (rank === 1) {
        return {
            hatSrc: electionWinnerHat,
            outfitSrc: outfitCenterElection,
            isKami7: true,
            isWinner: true,
        };
    }

    if (rank >= 2 && rank <= 7) {
        const kamiHats = [kami7Hat1, kami7Hat2, kami7Hat3];
        const hatIndex = (rank - 2) % kamiHats.length;
        return {
            hatSrc: kamiHats[hatIndex],
            outfitSrc: outfitCenterElection,
            isKami7: true,
            isWinner: false,
        };
    }

    return {
        hatSrc: null,
        outfitSrc: outfitBaseElection,
        isKami7: false,
        isWinner: false,
    };
};

/**
 * IdolAvatar Component
 * 5-Layer Stacking:
 * Layer 1 (Top / Front - Z:50): Hat / Head Accessory
 * Layer 2 (Z:40): Front Hair (Front style + Shared color)
 * Layer 3 (Z:30): Face
 * Layer 4 (Z:20): Body + Outfit (or exclusive General Election outfit)
 * Layer 5 (Bottom / Back - Z:10): Back Hair (Back style + Shared color)
 */
export const IdolAvatar = ({
    member,
    appearance: customAppearance,
    size = 'md',
    className = '',
    rounded = 'rounded-2xl',
    showBadge = false,
    badgeText = '',
    isCenter = false,
    glow = false,
    onClick = null,
    isElectionMode = false,
    electionRank = null,
}: {
    member?: any;
    appearance?: IdolAppearance;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'card' | 'full';
    className?: string;
    rounded?: string;
    showBadge?: boolean;
    badgeText?: string;
    isCenter?: boolean;
    glow?: boolean;
    onClick?: () => void;
    isElectionMode?: boolean;
    electionRank?: number | null;
}) => {
    const appearance = customAppearance || getMemberAppearance(member);

    // 1. Resolve Front & Back Hair with Shared Color
    const frontStyle = appearance.hairFrontStyleId || appearance.hairStyleId || 'hair_001';
    const backStyle = appearance.hairBackStyleId || appearance.hairStyleId || frontStyle;
    const { front: frontHairSrc, back: backHairSrc } = getHairAssets(
        frontStyle,
        backStyle,
        appearance.hairColorId
    );

    // 2. Resolve Face
    const faceObj = AVATAR_FACES.find(f => f.id === appearance.faceId) || AVATAR_FACES[0];
    const faceSrc = faceObj?.src;

    // 3. Resolve Outfit & Hat (with Election Overrides)
    let outfitSrc = (AVATAR_OUTFITS.find(o => o.id === appearance.outfitId) || AVATAR_OUTFITS[0])?.src;
    let hatSrc = (AVATAR_HATS.find(h => h.id === appearance.hatId && !h.isElectionOnly) || AVATAR_HATS[0])?.src;

    if (isElectionMode || (electionRank !== null && electionRank !== undefined)) {
        const electionLook = getElectionExclusiveLook(
            electionRank || (member?.rank) || (isCenter ? 1 : 999),
            member?.rosterId || member?.id
        );
        if (electionLook) {
            outfitSrc = electionLook.outfitSrc;
            hatSrc = electionLook.hatSrc;
        }
    }

    const sizeClasses = {
        xs: 'w-10 h-[60px]',
        sm: 'w-16 h-[96px]',
        md: 'w-24 h-[144px]',
        lg: 'w-36 h-[216px]',
        xl: 'w-52 h-[312px]',
        card: 'w-full max-w-[280px] aspect-[512/768]',
        full: 'w-full h-full aspect-[512/768]',
    };

    const containerSize = sizeClasses[size] || sizeClasses.md;

    return (
        <div
            onClick={onClick}
            className={`relative flex-shrink-0 select-none overflow-hidden aspect-[512/768] ${containerSize} ${rounded} ${className} ${
                isCenter ? 'ring-4 ring-amber-400 shadow-lg shadow-amber-400/30' : ''
            } ${glow ? 'shadow-xl shadow-pink-500/20' : ''} ${onClick ? 'cursor-pointer hover:opacity-95 transition-transform hover:scale-[1.02]' : ''}`}
            style={{
                background: 'linear-gradient(180deg, rgba(254, 240, 245, 0.95) 0%, rgba(240, 245, 255, 0.95) 100%)',
            }}
        >
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/40 pointer-events-none" />

            {/* Layer 5 (Bottom / Back - Z-Index 10): Back Hair */}
            {backHairSrc && (
                <img
                    src={backHairSrc}
                    alt="Back Hair"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 drop-shadow-sm"
                    loading="lazy"
                />
            )}

            {/* Layer 4 (Z-Index 20): Body + Outfit */}
            {outfitSrc && (
                <img
                    src={outfitSrc}
                    alt="Body and Outfit"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-sm"
                    loading="lazy"
                />
            )}

            {/* Layer 3 (Z-Index 30): Face */}
            {faceSrc && (
                <img
                    src={faceSrc}
                    alt="Idol Face"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30 drop-shadow-sm"
                    loading="lazy"
                />
            )}

            {/* Layer 2 (Z-Index 40): Front Hair */}
            {frontHairSrc && (
                <img
                    src={frontHairSrc}
                    alt="Front Hair"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-40 drop-shadow-md"
                    loading="lazy"
                />
            )}

            {/* Layer 1 (Top / Front - Z-Index 50): Hat / Head Accessory */}
            {hatSrc && (
                <img
                    src={hatSrc}
                    alt="Hat Accessory"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-50 drop-shadow-lg"
                    loading="lazy"
                />
            )}

            {/* Center Crown Minimal Subtle Icon */}
            {isCenter && !hatSrc && (
                <div className="absolute top-1 right-1 z-55 bg-amber-400/90 text-amber-950 text-[10px] p-0.5 px-1 rounded-full shadow-sm flex items-center justify-center border border-amber-200" title="Center">
                    👑
                </div>
            )}

            {/* Optional Custom Badge */}
            {showBadge && badgeText && (
                <div className="absolute bottom-1 inset-x-1 z-55 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold text-center py-0.5 px-1 rounded truncate">
                    {badgeText}
                </div>
            )}
        </div>
    );
};

/**
 * Character Creation & Customization Modal
 * Lets the player mix and match Front Hair (Bangs) and Back Hair (Extensions/Bobs/Ponytails)
 * in exact matching colors, along with Face expressions and Stage Outfits.
 */
export const CharacterCreatorModal = ({
    member,
    isOpen,
    onClose,
    onSave,
}: {
    member: any;
    isOpen: boolean;
    onClose: () => void;
    onSave: (appearance: IdolAppearance) => void;
}) => {
    if (!isOpen || !member) return null;

    const initialAppearance = getMemberAppearance(member);
    const [appearance, setAppearance] = useState<IdolAppearance>(initialAppearance);
    const [activeTab, setActiveTab] = useState<'hair' | 'face' | 'outfit'>('hair');
    const [hairSubTab, setHairSubTab] = useState<'front' | 'back'>('front');

    const handleRandomize = () => {
        const randomOutfit = AVATAR_OUTFITS[Math.floor(Math.random() * AVATAR_OUTFITS.length)];
        const randomFace = AVATAR_FACES[Math.floor(Math.random() * AVATAR_FACES.length)];
        const randomFront = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)];
        const randomBack = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)];
        const randomColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];

        setAppearance({
            outfitId: randomOutfit.id,
            faceId: randomFace.id,
            hairFrontStyleId: randomFront.id,
            hairBackStyleId: randomBack.id,
            hairColorId: randomColor.id,
            hatId: 'none',
        });
    };

    const handleMatchFrontAndBack = () => {
        setAppearance(prev => ({
            ...prev,
            hairBackStyleId: prev.hairFrontStyleId || 'hair_001',
        }));
    };

    const handleSave = () => {
        onSave(appearance);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-pink-200 dark:border-pink-900/40 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-2">
                        <Sparkles size={22} className="text-yellow-300 animate-pulse" />
                        <div>
                            <h3 className="font-extrabold text-lg sm:text-xl">Idol Character Stylist</h3>
                            <p className="text-xs text-pink-100 font-medium">Customizing {member.name}'s Mix & Match Avatar</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition text-white/80 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content Layout */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left: Interactive Character Live Stage Preview (512 x 768) */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50/60 via-purple-50/30 to-amber-50/40 dark:from-pink-950/30 dark:via-gray-800 dark:to-purple-950/20 rounded-2xl border border-pink-200 dark:border-pink-800/40 shadow-inner">
                        <div className="relative group">
                            <IdolAvatar
                                appearance={appearance}
                                size="xl"
                                rounded="rounded-2xl"
                                className="shadow-2xl border-2 border-white dark:border-gray-700 ring-4 ring-pink-300/50"
                            />
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-pink-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
                                <Sparkles size={12} /> {member.name}
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-2 w-full">
                            <button
                                onClick={handleRandomize}
                                className="w-full py-2 px-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold border border-gray-300 dark:border-gray-600 shadow-sm flex items-center justify-center gap-1.5 transition"
                            >
                                <Shuffle size={14} className="text-pink-500" /> Randomize Look
                            </button>
                            <button
                                onClick={handleMatchFrontAndBack}
                                className="w-full py-1.5 px-2 bg-pink-50 dark:bg-pink-950/40 hover:bg-pink-100 text-pink-700 dark:text-pink-300 rounded-xl text-[11px] font-bold border border-pink-200 dark:border-pink-800 shadow-xs flex items-center justify-center gap-1.5 transition"
                                title="Set Back Hair to match Front Hair style"
                            >
                                <LinkIcon size={12} /> Sync Front & Back Styles
                            </button>
                        </div>
                    </div>

                    {/* Right: Customization Controls */}
                    <div className="md:col-span-7 flex flex-col space-y-4">
                        {/* Main Category Tabs */}
                        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setActiveTab('hair')}
                                className={`flex-1 py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition ${
                                    activeTab === 'hair'
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                                }`}
                            >
                                <Scissors size={15} /> Hair System
                            </button>
                            <button
                                onClick={() => setActiveTab('face')}
                                className={`flex-1 py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition ${
                                    activeTab === 'face'
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                                }`}
                            >
                                <Smile size={15} /> Face ({AVATAR_FACES.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('outfit')}
                                className={`flex-1 py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition ${
                                    activeTab === 'outfit'
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                                }`}
                            >
                                <Shirt size={15} /> Outfit ({AVATAR_OUTFITS.length})
                            </button>
                        </div>

                        {/* Options List */}
                        <div className="flex-1 space-y-4 max-h-[380px] overflow-y-auto pr-1">
                            {/* HAIR TAB */}
                            {activeTab === 'hair' && (
                                <div className="space-y-4">
                                    {/* Color Palette (Shared Single Color for Front & Back) */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                            <Palette size={14} className="text-pink-500" /> 1. Select Shared Hair Color:
                                        </label>
                                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                                            {HAIR_COLORS.map(color => {
                                                const isSelected = appearance.hairColorId === color.id;
                                                return (
                                                    <button
                                                        key={color.id}
                                                        type="button"
                                                        onClick={() => setAppearance(prev => ({ ...prev, hairColorId: color.id }))}
                                                        className={`p-2 rounded-xl flex flex-col items-center gap-1 border-2 transition ${
                                                            isSelected
                                                                ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/50 ring-2 ring-pink-400/50 shadow-sm'
                                                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-300'
                                                        }`}
                                                        title={color.name}
                                                    >
                                                        <span
                                                            className="w-5 h-5 rounded-full border border-black/20 shadow-xs flex items-center justify-center"
                                                            style={{ backgroundColor: color.hex }}
                                                        >
                                                            {isSelected && <Check size={12} className={color.id === '_blonde' || color.id === '_lightblonde' ? 'text-black font-black' : 'text-white font-black'} />}
                                                        </span>
                                                        <span className="text-[9px] font-bold text-gray-700 dark:text-gray-300 truncate max-w-full">
                                                            {color.name.split(' ')[0]}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Front Piece vs Back Piece Sub-Selector */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                                                <Layers size={14} className="text-pink-500" /> 2. Mix & Match Hair Pieces:
                                            </label>
                                            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg border border-gray-200 dark:border-gray-700">
                                                <button
                                                    onClick={() => setHairSubTab('front')}
                                                    className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                                                        hairSubTab === 'front'
                                                            ? 'bg-pink-500 text-white shadow-xs'
                                                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                                                    }`}
                                                >
                                                    Front Hair Piece ({appearance.hairFrontStyleId || 'hair_001'})
                                                </button>
                                                <button
                                                    onClick={() => setHairSubTab('back')}
                                                    className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                                                        hairSubTab === 'back'
                                                            ? 'bg-pink-500 text-white shadow-xs'
                                                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                                                    }`}
                                                >
                                                    Back Hair Piece ({appearance.hairBackStyleId || 'hair_001'})
                                                </button>
                                            </div>
                                        </div>

                                        {/* Hairstyle Grid for the Selected Sub-Piece */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                            {HAIR_STYLES.map(style => {
                                                const isFront = hairSubTab === 'front';
                                                const currentPieceStyleId = isFront
                                                    ? (appearance.hairFrontStyleId || 'hair_001')
                                                    : (appearance.hairBackStyleId || 'hair_001');
                                                const isSelected = currentPieceStyleId === style.id;
                                                const { front: previewFront, back: previewBack } = getHairAssets(style.id, style.id, appearance.hairColorId);
                                                const previewImg = isFront ? previewFront : previewBack;

                                                return (
                                                    <div
                                                        key={style.id}
                                                        onClick={() => {
                                                            if (isFront) {
                                                                setAppearance(prev => ({ ...prev, hairFrontStyleId: style.id }));
                                                            } else {
                                                                setAppearance(prev => ({ ...prev, hairBackStyleId: style.id }));
                                                            }
                                                        }}
                                                        className={`p-2 rounded-2xl border-2 cursor-pointer transition flex items-center gap-2.5 ${
                                                            isSelected
                                                                ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 ring-2 ring-pink-400/50 shadow-md'
                                                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-300'
                                                        }`}
                                                    >
                                                        <div className="w-10 h-14 rounded-lg bg-gray-100 dark:bg-gray-900 overflow-hidden relative border border-gray-200 flex-shrink-0 flex items-center justify-center">
                                                            {previewImg && (
                                                                <img src={previewImg} alt={style.name} className="w-full h-full object-contain" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-xs text-gray-900 dark:text-gray-100 truncate">{style.name}</p>
                                                            <span className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold">
                                                                {isFront ? 'Front Bangs' : 'Back Hair'}
                                                            </span>
                                                        </div>
                                                        {isSelected && <Check size={16} className="text-pink-600 dark:text-pink-400 flex-shrink-0 font-bold" />}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* FACE TAB */}
                            {activeTab === 'face' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {AVATAR_FACES.map(face => {
                                        const isSelected = appearance.faceId === face.id;
                                        return (
                                            <div
                                                key={face.id}
                                                onClick={() => setAppearance(prev => ({ ...prev, faceId: face.id }))}
                                                className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-center gap-3 ${
                                                    isSelected
                                                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 ring-2 ring-pink-400/50 shadow-md'
                                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-300'
                                                }`}
                                            >
                                                <div className="w-12 h-16 rounded-lg bg-gray-100 dark:bg-gray-900 overflow-hidden relative border border-gray-200 flex-shrink-0">
                                                    <img src={face.src} alt={face.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-xs text-gray-900 dark:text-gray-100 truncate">{face.name}</p>
                                                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded">
                                                        {face.tag}
                                                    </span>
                                                </div>
                                                {isSelected && <Check size={18} className="text-pink-600 dark:text-pink-400 flex-shrink-0 font-bold" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* OUTFIT TAB */}
                            {activeTab === 'outfit' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {AVATAR_OUTFITS.map(outfit => {
                                        const isSelected = appearance.outfitId === outfit.id;
                                        return (
                                            <div
                                                key={outfit.id}
                                                onClick={() => setAppearance(prev => ({ ...prev, outfitId: outfit.id }))}
                                                className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-center gap-3 ${
                                                    isSelected
                                                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 ring-2 ring-pink-400/50 shadow-md'
                                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-300'
                                                }`}
                                            >
                                                <div className="w-12 h-16 rounded-lg bg-gray-100 dark:bg-gray-900 overflow-hidden relative border border-gray-200 flex-shrink-0">
                                                    <img src={outfit.src} alt={outfit.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-xs text-gray-900 dark:text-gray-100 truncate">{outfit.name}</p>
                                                    <span className="text-[10px] text-pink-600 dark:text-pink-400 font-bold bg-pink-50 dark:bg-pink-950/40 px-1.5 py-0.5 rounded">
                                                        {outfit.tag}
                                                    </span>
                                                </div>
                                                {isSelected && <Check size={18} className="text-pink-600 dark:text-pink-400 flex-shrink-0 font-bold" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Layer Explanatory Note */}
                        <div className="p-3 bg-pink-50 dark:bg-pink-950/30 rounded-xl border border-pink-200 dark:border-pink-900/40 text-[11px] text-pink-700 dark:text-pink-300 flex items-center gap-2">
                            <Sparkles size={16} className="flex-shrink-0 text-amber-500" />
                            <span>Front & Back pieces share your chosen color and can be freely mixed & matched across all 12 styles!</span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-xl shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] transition flex items-center gap-2"
                    >
                        <Check size={16} /> Save Character Style
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * Group Outfit Modal
 * Allows bulk changing the stage uniform/outfit for an entire group at once.
 * Carefully excludes Kennin (concurrent) members whose home group is elsewhere.
 */
export const GroupOutfitModal = ({
    isOpen,
    onClose,
    groups = [],
    selectedGroupId = 'main',
    members = [],
    sisterGroups = [],
    onApplyGroupOutfit,
}: {
    isOpen: boolean;
    onClose: () => void;
    groups?: Array<{ id: string | number; name: string }>;
    selectedGroupId?: string | number;
    members?: any[];
    sisterGroups?: any[];
    onApplyGroupOutfit: (groupId: string | number, outfitId: string) => void;
}) => {
    if (!isOpen) return null;

    const [currentGroup, setCurrentGroup] = useState<string | number>(selectedGroupId || 'main');
    const [selectedOutfitId, setSelectedOutfitId] = useState<string>(AVATAR_OUTFITS[0].id);

    // Determine target group info
    const isMain = String(currentGroup) === 'main';
    const activeSisterGroup = isMain ? null : sisterGroups.find(sg => String(sg.id) === String(currentGroup));
    const targetGroupName = isMain ? (groups.find(g => String(g.id) === 'main')?.name || 'Main Group') : (activeSisterGroup?.name || 'Sister Group');

    // Get strictly home/official members of this group (excluding Kennin)
    const eligibleMembers = (isMain ? members : (activeSisterGroup?.members || [])).filter(m => {
        if (!m) return false;
        if (isMain) {
            // Main group home members only:
            const isHome = (!m.isSisterMember || m.homeGroup === 'main' || String(m.groupId) === 'main' || !m.groupId);
            const isKenninFromSister = m.isSisterMember && (m.kenninGroups || []).includes('main');
            return isHome && !isKenninFromSister && !m.isKennin && !m.isExchangeStudent;
        } else {
            // Sister group home members only:
            const isHome = String(m.groupId) === String(currentGroup) || (activeSisterGroup?.name && m.homeGroup === activeSisterGroup.name);
            const isVisitingKennin = (m.kennin && String(m.kennin.groupId) === String(currentGroup) && m.homeGroup !== activeSisterGroup?.name) || (m.kenninGroups && m.kenninGroups.includes(String(currentGroup)) && m.homeGroup !== activeSisterGroup?.name);
            return isHome && !isVisitingKennin && !m.isExchangeStudent;
        }
    });

    const handleApply = () => {
        onApplyGroupOutfit(currentGroup, selectedOutfitId);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-pink-200 dark:border-pink-900/40 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-2.5">
                        <Shirt size={22} className="text-yellow-300" />
                        <div>
                            <h3 className="font-extrabold text-lg sm:text-xl">Group Stage Wardrobe</h3>
                            <p className="text-xs text-pink-100 font-medium">Coordinate stage uniform for all home members</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition text-white/80 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {/* Target Group Selector */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                            Select Target Group:
                        </label>
                        <select
                            value={String(currentGroup)}
                            onChange={(e) => setCurrentGroup(e.target.value)}
                            className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500"
                        >
                            {groups.map(g => (
                                <option key={g.id} value={String(g.id)}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                            <Sparkles size={12} className="text-pink-500" />
                            Targeting <strong>{eligibleMembers.length} official members</strong> (Kennin & concurrent positions are excluded).
                        </p>
                    </div>

                    {/* Outfit Selection Cards */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                            Select Uniform / Stage Costume:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                            {AVATAR_OUTFITS.map(outfit => {
                                const isSelected = selectedOutfitId === outfit.id;
                                return (
                                    <div
                                        key={outfit.id}
                                        onClick={() => setSelectedOutfitId(outfit.id)}
                                        className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-center gap-3 ${
                                            isSelected
                                                ? 'border-pink-500 bg-pink-50/80 dark:bg-pink-950/40 ring-2 ring-pink-400/50 shadow-md'
                                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-300'
                                        }`}
                                    >
                                        <div className="w-12 h-16 rounded-xl bg-gray-100 dark:bg-gray-900 overflow-hidden relative border border-gray-200 dark:border-gray-700 flex-shrink-0 flex items-center justify-center">
                                            <img src={outfit.src} alt={outfit.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-extrabold text-xs text-gray-900 dark:text-gray-100 truncate">{outfit.name}</p>
                                            <span className="inline-block mt-1 text-[9px] font-bold text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-950/60 px-2 py-0.5 rounded-md">
                                                {outfit.tag}
                                            </span>
                                        </div>
                                        {isSelected && <Check size={18} className="text-pink-600 dark:text-pink-400 font-bold" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Member Roster Preview */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-2">
                            Eligible Home Idols in {targetGroupName} ({eligibleMembers.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                            {eligibleMembers.map(m => (
                                <span
                                    key={m.rosterId || m.id}
                                    className="text-[11px] font-bold px-2 py-1 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                                >
                                    {m.name}
                                </span>
                            ))}
                            {eligibleMembers.length === 0 && (
                                <span className="text-xs text-gray-400 italic">No official home members found in this group.</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        disabled={eligibleMembers.length === 0}
                        className="px-6 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 rounded-xl shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                    >
                        <Check size={16} /> Apply Uniform to {targetGroupName} ({eligibleMembers.length})
                    </button>
                </div>
            </div>
        </div>
    );
};
