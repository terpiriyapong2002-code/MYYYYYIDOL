// @ts-nocheck
import React, { useState } from 'react';
import {
    Globe, Sparkles, Zap, DollarSign, Users, Award, Shield,
    Flame, Check, X, ChevronRight, Play, MapPin, Radio,
    Compass, Package, Trophy, ArrowRight, Eye, Disc
} from 'lucide-react';

export const WorldTourTab = ({
    groupName,
    sisterGroups = [],
    venues = [],
    money = 0,
    week = 1,
    activeWorldTour = null,
    worldTourHistory = [],
    groupLightsticks = {},
    designGroupLightstick,
    produceGroupLightstick,
    startUniversalWorldTour,
    progressWorldTourLeg,
    cancelWorldTour,
    showModal,
    setShowModal,
    modalData,
    setModalData
}) => {
    const [subTab, setSubTab] = useState('tour'); // 'tour' | 'lightstick' | 'history'
    const [selectedGroupId, setSelectedGroupId] = useState('main');

    // Tour Planner Local State
    const [tourName, setTourName] = useState('');
    const [selectedVenueIds, setSelectedVenueIds] = useState([22, 23, 24, 25, 26]); // Default 5-Dome
    const [stageTier, setStageTier] = useState('advanced'); // 'standard' | 'advanced' | 'mega'
    const [vipEnabled, setVipEnabled] = useState(true);

    // Lightstick Studio Local State
    const [lsName, setLsName] = useState('');
    const [lsPrimaryColor, setLsPrimaryColor] = useState('#ec4899');
    const [lsAccentColor, setLsAccentColor] = useState('#a855f7');
    const [lsTier, setLsTier] = useState('bluetooth'); // 'standard' | 'acrylic' | 'bluetooth'
    const [produceQuantity, setProduceQuantity] = useState(5000);

    // All available groups (Main + Sister Groups + K-Pop Groups)
    const allGroups = [
        { id: 'main', name: groupName, type: 'J-Pop Main Franchise', isKpop: false },
        ...sisterGroups.filter(sg => !sg.isDisbanded).map(sg => ({
            id: String(sg.id),
            name: sg.name,
            type: sg.isKpop || sg.type === 'kpop_gg' ? 'K-Pop Girl Group' : 'Branch / Sister Group',
            isKpop: sg.isKpop || sg.type === 'kpop_gg'
        }))
    ];

    const currentGroupLightstick = groupLightsticks[String(selectedGroupId)];

    const tourPresets = [
        {
            id: 'japan_5dome',
            name: '🗾 Japan 5-Dome Tour',
            venues: [22, 23, 24, 25, 26],
            desc: 'Nagoya, Osaka, Fukuoka, Tokyo Dome & National Stadium (Cap: 250,000+)'
        },
        {
            id: 'asia_sea',
            name: '🌏 Asia & SEA Arena Tour',
            venues: [27, 28, 29, 30],
            desc: 'Seoul KSPO Dome, Bangkok Impact, Manila MOA Arena, Singapore (Cap: 54,000+)'
        },
        {
            id: 'north_america',
            name: '🗽 North America Stadium Tour',
            venues: [31, 32, 38, 39],
            desc: 'LA Forum, NYC MSG, SoFi Stadium & MetLife Stadium (Cap: 187,000+)'
        },
        {
            id: 'europe_tour',
            name: '🏰 European Arena Tour',
            venues: [33, 34, 35, 40],
            desc: 'London O2, Paris Accor, Berlin Mercedes-Benz & Wembley (Cap: 144,000+)'
        },
        {
            id: 'latin_america',
            name: '💃 Latin America Stadium Tour',
            venues: [41, 42],
            desc: 'Mexico City Foro Sol & São Paulo Allianz Parque (Cap: 110,000+)'
        },
        {
            id: 'mega_global',
            name: '👑 Mega Global Stadium World Tour',
            venues: [25, 27, 28, 31, 32, 33, 36, 38, 40, 41],
            desc: '10 Legendary Stadiums across 4 Continents (Cap: 550,000+)'
        }
    ];

    const stageTiers = [
        { id: 'standard', name: 'Standard Touring Rig', cost: 5000000, mult: '+0%', desc: 'Crisp LED walls, pro audio, standard laser arrays.' },
        { id: 'advanced', name: 'Pyrotechnics & Hydraulics', cost: 15000000, mult: '+25%', desc: 'Flame bursts, flying catwalks, moving LED pods, confetti cannons.' },
        { id: 'mega', name: 'Mega Stadium Drone & Laser Spectacle', cost: 35000000, mult: '+50%', desc: '300-drone aerial light show, stadium sync lasers, live band, 8K ultra towers.' }
    ];

    const lightstickTiers = [
        { id: 'standard', name: 'Classic Penlight', cost: 1000000, unitCost: 1000, unitPrice: 3000, desc: 'Single-color cyalume wand. Affordable, solid fan staple.' },
        { id: 'acrylic', name: 'Custom Acrylic 3D Lightstick', cost: 2500000, unitCost: 2000, unitPrice: 5500, desc: 'Custom molded 3D emblem with dual-color LED modes (+15% tour hype).' },
        { id: 'bluetooth', name: 'Bluetooth Stadium Central-Sync Lightstick', cost: 5000000, unitCost: 4000, unitPrice: 10000, desc: 'Full stadium DMX central wireless control. Synchronizes light waves across 50,000 fans! (+35% concert gross & merch sales).' }
    ];

    const activeGroupObj = allGroups.find(g => g.id === selectedGroupId) || allGroups[0];

    return (
        <div className="space-y-6 pb-12">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 border border-indigo-500/30 p-6 shadow-2xl">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                                <Globe size={12} className="text-indigo-400 animate-spin" /> Universal Tour Division
                            </span>
                            <span className="text-xs text-slate-400">Week {week}</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-pink-200 to-amber-200 tracking-tight">
                            World Tours & Official Lightsticks
                        </h1>
                        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                            Design bluetooth wireless-synchronized lightsticks, book prestige dome and stadium circuits, and broadcast blockbuster world tours across Japan, Asia, the Americas, and Europe.
                        </p>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-indigo-500/20">
                        <div className="text-center px-3 py-1.5 border-r border-slate-800">
                            <div className="text-xs text-slate-400 font-medium">Tours Completed</div>
                            <div className="text-lg font-black text-indigo-400">{worldTourHistory.length}</div>
                        </div>
                        <div className="text-center px-3 py-1.5 border-r border-slate-800">
                            <div className="text-xs text-slate-400 font-medium">Lightsticks Created</div>
                            <div className="text-lg font-black text-pink-400">{Object.keys(groupLightsticks).length}</div>
                        </div>
                        <div className="text-center px-3 py-1.5">
                            <div className="text-xs text-slate-400 font-medium">Global Venues</div>
                            <div className="text-lg font-black text-amber-400">{venues.length}</div>
                        </div>
                    </div>
                </div>

                {/* Sub-Nav Buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-indigo-500/20">
                    <button
                        onClick={() => setSubTab('tour')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                            subTab === 'tour'
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25 border border-indigo-400/50'
                                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-700/50'
                        }`}
                    >
                        <Compass size={16} /> World Tour Itinerary & Planner
                    </button>
                    <button
                        onClick={() => setSubTab('lightstick')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                            subTab === 'lightstick'
                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-pink-500/25 border border-pink-400/50'
                                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-700/50'
                        }`}
                    >
                        <Radio size={16} /> Lightstick Design Studio & Stock
                    </button>
                    <button
                        onClick={() => setSubTab('history')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                            subTab === 'history'
                                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-amber-500/25 border border-amber-400/50'
                                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-700/50'
                        }`}
                    >
                        <Trophy size={16} /> Tour Box Office Archive ({worldTourHistory.length})
                    </button>
                </div>
            </div>

            {/* Active Tour Live Banner */}
            {activeWorldTour && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-slate-900 border border-indigo-500/50 shadow-2xl space-y-3 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shrink-0">
                                <Flame size={24} className="animate-pulse text-amber-400" />
                            </div>
                            <div>
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                    LIVE IN PROGRESS • Stop {activeWorldTour.currentLegIndex + 1} of {activeWorldTour.legs.length}
                                </span>
                                <h3 className="text-xl font-black text-slate-100 mt-0.5">{activeWorldTour.tourName}</h3>
                                <p className="text-xs text-slate-300">
                                    Performing Group: <span className="font-bold text-pink-400">{activeWorldTour.groupName}</span> • Current Stop: <span className="font-bold text-amber-300">{activeWorldTour.legs[activeWorldTour.currentLegIndex]?.venueName} ({activeWorldTour.legs[activeWorldTour.currentLegIndex]?.country})</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={progressWorldTourLeg}
                                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
                            >
                                <Play size={16} fill="white" /> Perform Current Stop
                            </button>
                            <button
                                onClick={cancelWorldTour}
                                className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 text-xs font-bold rounded-xl border border-slate-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs text-slate-300 font-semibold">
                            <span>Itinerary Completion</span>
                            <span className="font-mono text-indigo-300 font-bold">
                                {activeWorldTour.currentLegIndex} / {activeWorldTour.legs.length} Stops (Gross: ¥{activeWorldTour.totalRevenue.toLocaleString()})
                            </span>
                        </div>
                        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                            <div
                                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full transition-all duration-500 rounded-full"
                                style={{ width: `${(activeWorldTour.currentLegIndex / activeWorldTour.legs.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* 1. WORLD TOUR PLANNER */}
            {/* ======================================================== */}
            {subTab === 'tour' && (
                <div className="space-y-6">
                    {/* Top Controls: Select Group & Presets */}
                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Select Touring Group</label>
                                <select
                                    value={selectedGroupId}
                                    onChange={(e) => {
                                        setSelectedGroupId(e.target.value);
                                        const grp = allGroups.find(g => g.id === e.target.value);
                                        setTourName(`${grp?.name || groupName} WORLD TOUR 2026`);
                                    }}
                                    className="w-full bg-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 border border-slate-700 font-semibold"
                                >
                                    {allGroups.map(g => (
                                        <option key={g.id} value={g.id}>{g.name} ({g.type})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Tour Title</label>
                                <input
                                    type="text"
                                    value={tourName}
                                    placeholder="e.g. 1st World Tour: REVOLUTION"
                                    onChange={(e) => setTourName(e.target.value)}
                                    className="w-full bg-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 border border-slate-700"
                                />
                            </div>
                        </div>

                        {/* Presets Grid */}
                        <div>
                            <label className="block text-xs font-bold text-slate-300 mb-2">Quick Itinerary Presets</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                {tourPresets.map(preset => {
                                    const isSel = JSON.stringify(selectedVenueIds) === JSON.stringify(preset.venues);
                                    return (
                                        <button
                                            key={preset.id}
                                            onClick={() => setSelectedVenueIds(preset.venues)}
                                            className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                                                isSel
                                                    ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-500/10'
                                                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                                            }`}
                                        >
                                            <div className="font-bold text-slate-100 text-xs flex items-center justify-between">
                                                <span>{preset.name}</span>
                                                {isSel && <Check size={14} className="text-indigo-400" />}
                                            </div>
                                            <div className="text-[11px] text-slate-400 line-clamp-2">{preset.desc}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Stage Production & VIP Toggle */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
                            {stageTiers.map(st => {
                                const isSel = stageTier === st.id;
                                return (
                                    <div
                                        key={st.id}
                                        onClick={() => setStageTier(st.id)}
                                        className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1 ${
                                            isSel
                                                ? 'bg-purple-950/60 border-purple-500'
                                                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-slate-100">{st.name}</span>
                                            <span className="text-[10px] font-bold text-pink-400">{st.mult}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-400">{st.desc}</div>
                                        <div className="text-[11px] font-bold text-amber-400 pt-1">¥{(st.cost / 10000).toLocaleString()}w cost</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* VIP Soundcheck Box */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                            <div>
                                <span className="text-xs font-bold text-slate-200">VIP Soundcheck & Hi-Touch Add-On (+¥2,500/ticket)</span>
                                <p className="text-[11px] text-slate-400">Exclusive pre-show soundcheck pass. High VIP take-up rate for hardcore fans.</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={vipEnabled}
                                onChange={(e) => setVipEnabled(e.target.checked)}
                                className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Venue Selection Catalog */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                                    <MapPin size={18} className="text-indigo-400" /> Tour Itinerary ({selectedVenueIds.length} stops selected)
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Select the global arenas and stadiums you want on your tour route.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    startUniversalWorldTour({
                                        groupId: selectedGroupId,
                                        tourName: tourName || `${activeGroupObj.name} WORLD TOUR: DESTINY`,
                                        venueIds: selectedVenueIds,
                                        stageTier,
                                        vipEnabled
                                    });
                                }}
                                disabled={selectedVenueIds.length === 0 || !!activeWorldTour}
                                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/30 disabled:opacity-50 flex items-center gap-2"
                            >
                                <Globe size={16} /> Launch World Tour!
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {venues.map(v => {
                                const isSel = selectedVenueIds.includes(v.id);
                                return (
                                    <div
                                        key={v.id}
                                        onClick={() => {
                                            if (isSel) setSelectedVenueIds(prev => prev.filter(id => id !== v.id));
                                            else setSelectedVenueIds(prev => [...prev, v.id]);
                                        }}
                                        className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                                            isSel
                                                ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10'
                                                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-bold text-indigo-400 uppercase">
                                                    {v.region || 'Domestic'} • {v.country || 'Japan'}
                                                </span>
                                                <h4 className="font-bold text-slate-100 text-xs">{v.name}</h4>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSel ? 'bg-indigo-500 border-indigo-400 text-white' : 'border-slate-700'}`}>
                                                {isSel && <Check size={10} />}
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                                            <span>Cap: <strong className="text-slate-200">{(v.capacity || 0).toLocaleString()}</strong></span>
                                            <span>Rent: <strong className="text-amber-400">¥{(v.cost || 0).toLocaleString()}</strong></span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* 2. LIGHTSTICK STUDIO */}
            {/* ======================================================== */}
            {subTab === 'lightstick' && (
                <div className="space-y-6">
                    {/* Active Lightstick Preview Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                                    Official Lightstick Device
                                </span>
                                <span className="text-xs text-slate-400">Group: {activeGroupObj.name}</span>
                            </div>

                            {currentGroupLightstick ? (
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-100">{currentGroupLightstick.name}</h3>
                                    <p className="text-xs text-slate-300">
                                        Tier: <strong className="text-pink-400 uppercase">{currentGroupLightstick.tier}</strong> • Unit MSRP: <strong className="text-emerald-400">¥{currentGroupLightstick.unitPrice.toLocaleString()}</strong>
                                    </p>

                                    <div className="grid grid-cols-3 gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center text-xs">
                                        <div>
                                            <div className="text-slate-400">Available Stock</div>
                                            <div className="text-base font-black text-slate-100">{(currentGroupLightstick.stock || 0).toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-400">Total Sold</div>
                                            <div className="text-base font-black text-indigo-400">{(currentGroupLightstick.totalSold || 0).toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-400">Gross Revenue</div>
                                            <div className="text-base font-black text-emerald-400">¥{(currentGroupLightstick.totalRevenue || 0).toLocaleString()}</div>
                                        </div>
                                    </div>

                                    {/* Production Bar */}
                                    <div className="flex items-center gap-3 pt-3">
                                        <select
                                            value={produceQuantity}
                                            onChange={(e) => setProduceQuantity(Number(e.target.value))}
                                            className="bg-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-700"
                                        >
                                            <option value={2500}>Produce 2,500 units (¥{(2500 * (currentGroupLightstick.unitCost || 2000)).toLocaleString()})</option>
                                            <option value={5000}>Produce 5,000 units (¥{(5000 * (currentGroupLightstick.unitCost || 2000)).toLocaleString()})</option>
                                            <option value={15000}>Produce 15,000 units (¥{(15000 * (currentGroupLightstick.unitCost || 2000)).toLocaleString()})</option>
                                            <option value={50000}>Produce 50,000 Dome Batch (¥{(50000 * (currentGroupLightstick.unitCost || 2000)).toLocaleString()})</option>
                                        </select>

                                        <button
                                            onClick={() => produceGroupLightstick(selectedGroupId, produceQuantity)}
                                            className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-pink-600/20 flex items-center gap-1.5"
                                        >
                                            <Package size={14} /> Manufacture Stock
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-slate-200">No Official Lightstick Designed Yet</h3>
                                    <p className="text-xs text-slate-400 max-w-md">
                                        Design an official lightstick below with custom colors and Bluetooth stadium-sync connectivity to generate massive merchandise revenue on tours!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Visual Glow Lightstick Renderer */}
                        <div className="relative flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[200px] overflow-hidden">
                            {/* Glow beam */}
                            <div
                                className="w-24 h-24 rounded-full blur-2xl opacity-80 animate-pulse pointer-events-none"
                                style={{ backgroundColor: currentGroupLightstick?.primaryColor || lsPrimaryColor }}
                            />
                            {/* Lightstick Wand Graphic */}
                            <div className="relative z-10 flex flex-col items-center -mt-16 space-y-1">
                                <div
                                    className="w-14 h-14 rounded-full border-2 border-white/60 shadow-2xl flex items-center justify-center"
                                    style={{
                                        background: `radial-gradient(circle, ${currentGroupLightstick?.primaryColor || lsPrimaryColor} 0%, ${currentGroupLightstick?.accentColor || lsAccentColor} 100%)`,
                                        boxShadow: `0 0 25px ${currentGroupLightstick?.primaryColor || lsPrimaryColor}`
                                    }}
                                >
                                    <Radio size={20} className="text-white animate-spin" />
                                </div>
                                <div className="w-4 h-16 bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-md shadow-md border border-slate-600" />
                                <span className="text-[10px] font-bold text-slate-400 pt-1">
                                    {currentGroupLightstick ? currentGroupLightstick.name : 'Custom Preview'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Creator Form */}
                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                            <Sparkles size={18} className="text-pink-400" /> Design / Upgrade Official Lightstick
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Target Group</label>
                                <select
                                    value={selectedGroupId}
                                    onChange={(e) => {
                                        setSelectedGroupId(e.target.value);
                                        const grp = allGroups.find(g => g.id === e.target.value);
                                        setLsName(`${grp?.name || groupName} Official Lightstick`);
                                    }}
                                    className="w-full bg-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 border border-slate-700"
                                >
                                    {allGroups.map(g => (
                                        <option key={g.id} value={g.id}>{g.name} ({g.type})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Lightstick Name</label>
                                <input
                                    type="text"
                                    value={lsName}
                                    placeholder="e.g. Candybong, Caratbong, Sakura Blade"
                                    onChange={(e) => setLsName(e.target.value)}
                                    className="w-full bg-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 border border-slate-700"
                                />
                            </div>

                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Primary Color</label>
                                    <input
                                        type="color"
                                        value={lsPrimaryColor}
                                        onChange={(e) => setLsPrimaryColor(e.target.value)}
                                        className="w-full h-9 bg-slate-800 rounded-xl border border-slate-700 cursor-pointer p-1"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Accent Glow</label>
                                    <input
                                        type="color"
                                        value={lsAccentColor}
                                        onChange={(e) => setLsAccentColor(e.target.value)}
                                        className="w-full h-9 bg-slate-800 rounded-xl border border-slate-700 cursor-pointer p-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tier Selector */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                            {lightstickTiers.map(lt => {
                                const isSel = lsTier === lt.id;
                                return (
                                    <div
                                        key={lt.id}
                                        onClick={() => setLsTier(lt.id)}
                                        className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                                            isSel
                                                ? 'bg-pink-950/40 border-pink-500 shadow-lg shadow-pink-500/10'
                                                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-100">{lt.name}</span>
                                            <span className="text-[10px] font-bold text-pink-400">¥{(lt.cost / 10000).toLocaleString()}w R&D</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400">{lt.desc}</p>
                                        <div className="flex justify-between text-[10px] text-slate-300 pt-1 border-t border-slate-800">
                                            <span>Cost: ¥{lt.unitCost.toLocaleString()}</span>
                                            <span className="text-emerald-400 font-bold">MSRP: ¥{lt.unitPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => {
                                designGroupLightstick({
                                    groupId: selectedGroupId,
                                    name: lsName || `${activeGroupObj.name} Official Lightstick`,
                                    primaryColor: lsPrimaryColor,
                                    accentColor: lsAccentColor,
                                    tier: lsTier
                                });
                            }}
                            className="w-full py-3 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-600/30 flex items-center justify-center gap-1.5"
                        >
                            <Sparkles size={16} /> Launch Official Lightstick R&D
                        </button>
                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* 3. TOUR BOX OFFICE ARCHIVES */}
            {/* ======================================================== */}
            {subTab === 'history' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                                <Trophy size={18} className="text-amber-400" /> World Tour Box Office Archives
                            </h3>
                            <p className="text-xs text-slate-400">Historical records of completed dome and stadium tours.</p>
                        </div>
                    </div>

                    {worldTourHistory.length === 0 ? (
                        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 space-y-2">
                            <Trophy size={48} className="mx-auto text-slate-600" />
                            <h4 className="text-base font-semibold text-slate-300">No Tour History Yet</h4>
                            <p className="text-xs">Completed World Tours and 5-Dome Tours will be archived here with attendance records.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {worldTourHistory.map((tour, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                                {tour.groupName}
                                            </span>
                                            <h4 className="text-lg font-black text-slate-100 mt-1">{tour.tourName}</h4>
                                            <div className="text-xs text-slate-400">
                                                {tour.legs?.length || 0} stops • Stage: <span className="uppercase text-purple-400 font-bold">{tour.stageTier}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center text-xs">
                                        <div>
                                            <div className="text-[10px] text-slate-400">Total Attendees</div>
                                            <div className="text-sm font-bold text-slate-100">{(tour.totalAttendance || 0).toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400">Ticket Revenue</div>
                                            <div className="text-sm font-bold text-indigo-400">¥{(tour.totalTicketRevenue || 0).toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400">Total Gross</div>
                                            <div className="text-sm font-bold text-emerald-400">¥{(tour.totalRevenue || 0).toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ======================================================== */}
            {/* TOUR LEG RESULT MODAL */}
            {/* ======================================================== */}
            {showModal === 'tourLegResultModal' && modalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 rounded-2xl max-w-lg w-full p-6 text-center shadow-2xl space-y-4 animate-in zoom-in-95">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
                            {modalData.isFinished ? <Trophy size={32} /> : <Globe size={32} className="animate-spin" />}
                        </div>

                        <div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                                {modalData.isFinished ? '🎉 World Tour Finale!' : '✨ Tour Stop Triumph!'}
                            </span>
                            <h3 className="text-2xl font-black text-slate-100 mt-2">
                                {modalData.leg?.venueName}
                            </h3>
                            <p className="text-xs font-semibold text-slate-400 mt-0.5">
                                {modalData.leg?.country} ({modalData.leg?.region}) • {modalData.tour?.tourName}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center text-xs">
                            <div>
                                <div className="text-[10px] text-slate-400">Attendance</div>
                                <div className="text-sm font-bold text-slate-100">{(modalData.leg?.attendance || 0).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400">Ticket Revenue</div>
                                <div className="text-sm font-bold text-indigo-400">¥{(modalData.leg?.ticketRevenue || 0).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400">Merch / Lightsticks</div>
                                <div className="text-sm font-bold text-emerald-400">¥{(modalData.leg?.merchRevenue || 0).toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-purple-900/30 border border-purple-500/30 text-xs text-purple-200">
                            ✨ +{(modalData.leg?.fanGain || 0).toLocaleString()} New Global Fans Acquired!
                        </div>

                        <button
                            onClick={() => setShowModal(null)}
                            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold rounded-xl shadow-lg"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
