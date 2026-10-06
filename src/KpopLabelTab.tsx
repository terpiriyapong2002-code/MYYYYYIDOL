// @ts-nocheck
import React, { useState } from 'react';
import {
    Sparkles, Mic2, Users, Music, TrendingUp, Award, Calendar, DollarSign,
    Globe, AlertCircle, Plus, Flame, Star, Check, X, Shield, Clock,
    Layers, ChevronRight, Play, Zap, ArrowUpRight, Trophy, RefreshCw
} from 'lucide-react';

export const KpopLabelTab = ({
    kpopTrainees = [],
    kpopComebacks = [],
    melonChart = [],
    sisterGroups = [],
    money = 0,
    week = 1,
    startKpopAudition,
    confirmKpopTraineeRecruitment,
    setTraineeFocus,
    releaseTrainee,
    finishKpopDebut,
    renegotiateKpopContract,
    releaseKpopComeback,
    setMessage,
    addNotification,
    showModal,
    setShowModal,
    modalData,
    setModalData,
    pendingContractRenewal,
    setPendingContractRenewal,
}) => {
    const [activeSection, setActiveSection] = useState('academy');
    const [auditionLocation, setAuditionLocation] = useState('Seoul');

    // Local states for Debut Modal
    const [selectedTraineesForDebut, setSelectedTraineesForDebut] = useState([]);
    const [debutGroupName, setDebutGroupName] = useState('');
    const [debutConcept, setDebutConcept] = useState('Girl Crush');
    const [targetGroupId, setTargetGroupId] = useState('');

    // Local states for Comeback Modal
    const [selectedComebackGroupId, setSelectedComebackGroupId] = useState('');
    const [comebackTitle, setComebackTitle] = useState('');
    const [comebackBSides, setComebackBSides] = useState(['']);
    const [comebackConcept, setComebackConcept] = useState('Girl Crush');
    const [comebackMvTier, setComebackMvTier] = useState('standard');

    // Local states for Contract Renewal
    const [selectedMemberForContract, setSelectedMemberForContract] = useState(null);

    // Filter K-Pop groups
    const kpopGroups = sisterGroups.filter(sg => sg.isKpop || sg.type === 'kpop_gg');

    // All active K-Pop members across all groups
    const kpopMembers = kpopGroups.flatMap(sg => (sg.members || []).map(m => ({ ...m, groupName: sg.name, groupId: sg.id })));

    const activeTrainees = kpopTrainees.filter(t => t.contractStatus === 'active');
    const weeklyTraineeUpkeep = activeTrainees.length * 300000;

    const kpopConcepts = [
        { id: 'Girl Crush', label: 'Girl Crush / Fierce', desc: 'High energy choreography. Best for strong dancers.', req: 'Dance 65+' },
        { id: 'Hip-Hop / Street', label: 'Hip-Hop / Street Style', desc: 'Punchy beats and rhythmic flow. Best for skilled rappers.', req: 'Rap 60+' },
        { id: 'Cute / Bubblegum', label: 'Cute / Bubblegum Pop', desc: 'Catchy hooks and bright aesthetics. Best for visual aces.', req: 'Visual 65+' },
        { id: 'Dark / Teen Crush', label: 'Dark / Teen Crush', desc: 'Emotive melodies and powerful belts. Best for main vocalists.', req: 'Vocal 65+' },
        { id: 'Retro / Y2K', label: 'Retro / Y2K Nostalgia', desc: 'Funky basslines and viral appeal. Best for high variety.', req: 'Variety 60+' },
        { id: 'Elegant / High-Teen', label: 'Elegant / High-Teen Royal', desc: 'Sophisticated aesthetics and royal prestige. High vocal & visual synergy.', req: 'Vocal & Visual 70+' },
    ];

    const getPotentialColor = (pot) => {
        switch (pot) {
            case 'S': return 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-amber-500/20';
            case 'A': return 'bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-purple-500/20';
            case 'B': return 'bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-blue-500/20';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
        }
    };

    const getSpecialityColor = (spec) => {
        switch (spec) {
            case 'rapper': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
            case 'vocal': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
            case 'dancer': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
            case 'visual': return 'text-pink-400 bg-pink-500/10 border-pink-500/30';
            default: return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
        }
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Header / Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950 to-pink-950 border border-purple-500/30 p-6 shadow-2xl">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1">
                                <Sparkles size={12} className="text-pink-400 animate-pulse" /> K-Pop Global Division
                            </span>
                            <span className="text-xs text-slate-400">Week {week}</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200 tracking-tight">
                            K-Pop Label & Academy System
                        </h1>
                        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                            Scout international trainees, hone raw talent with rigorous rap and dance regimens, formulate explosive comeback concepts, and conquer the global Melon charts.
                        </p>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-purple-500/20">
                        <div className="text-center px-3 py-1.5 border-r border-slate-800">
                            <div className="text-xs text-slate-400 font-medium">Active Trainees</div>
                            <div className="text-lg font-black text-pink-400">{activeTrainees.length}</div>
                        </div>
                        <div className="text-center px-3 py-1.5 border-r border-slate-800">
                            <div className="text-xs text-slate-400 font-medium">K-Pop Groups</div>
                            <div className="text-lg font-black text-purple-400">{kpopGroups.length}</div>
                        </div>
                        <div className="text-center px-3 py-1.5 border-r border-slate-800">
                            <div className="text-xs text-slate-400 font-medium">Melon Entries</div>
                            <div className="text-lg font-black text-emerald-400">{melonChart.length}</div>
                        </div>
                        <div className="text-center px-3 py-1.5">
                            <div className="text-xs text-slate-400 font-medium">Trainee Upkeep</div>
                            <div className="text-sm font-bold text-amber-400">¥{(weeklyTraineeUpkeep / 10000).toFixed(0)}w/wk</div>
                        </div>
                    </div>
                </div>

                {/* Sub-Navigation Buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-purple-500/20">
                    <button
                        onClick={() => setActiveSection('academy')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                            activeSection === 'academy'
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/25 border border-pink-400/50'
                                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-700/50'
                        }`}
                    >
                        <Users size={16} /> Trainee Academy ({activeTrainees.length})
                    </button>
                    <button
                        onClick={() => setActiveSection('comebacks')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                            activeSection === 'comebacks'
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/25 border border-pink-400/50'
                                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-700/50'
                        }`}
                    >
                        <Flame size={16} /> Groups & Comebacks ({kpopGroups.length})
                    </button>
                    <button
                        onClick={() => setActiveSection('chart')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                            activeSection === 'chart'
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/25 border border-pink-400/50'
                                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-700/50'
                        }`}
                    >
                        <TrendingUp size={16} /> Melon Global Top 100
                    </button>
                    <button
                        onClick={() => setActiveSection('contracts')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                            activeSection === 'contracts'
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/25 border border-pink-400/50'
                                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-slate-700/50'
                        }`}
                    >
                        <Shield size={16} /> Contract Management ({kpopMembers.length})
                    </button>
                </div>
            </div>

            {/* Expiring Contract Alert Banner */}
            {pendingContractRenewal && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/80 via-amber-950/80 to-slate-900 border border-red-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
                    <div className="flex items-center gap-3">
                        <AlertCircle size={24} className="text-red-400 shrink-0" />
                        <div>
                            <div className="text-sm font-bold text-red-200">
                                🚨 Urgent: {pendingContractRenewal.name}'s K-Pop Exclusive Contract has Expired!
                            </div>
                            <div className="text-xs text-red-300/80">
                                Renew their contract for 1, 2, or 3 years, or conclude their idol tenure gracefully.
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedMemberForContract(pendingContractRenewal);
                            setShowModal('kpopContractModal');
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-red-600/30 shrink-0"
                    >
                        Review Terms
                    </button>
                </div>
            )}

            {/* ======================================================== */}
            {/* 1. TRAINEE ACADEMY VIEW */}
            {/* ======================================================== */}
            {activeSection === 'academy' && (
                <div className="space-y-6">
                    {/* Audition Bar */}
                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-100">Host Global Auditions</h3>
                                <p className="text-xs text-slate-400">
                                    Recruit raw vocalists, dancers, and rappers with elite potential (Cost: ¥500,000).
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <select
                                value={auditionLocation}
                                onChange={(e) => setAuditionLocation(e.target.value)}
                                className="bg-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-pink-500 flex-1 sm:flex-none"
                            >
                                <option value="Seoul">🇰🇷 Seoul, South Korea</option>
                                <option value="Tokyo">🇯🇵 Tokyo, Japan</option>
                                <option value="Bangkok">🇹🇭 Bangkok, Thailand</option>
                                <option value="Shanghai">🇨🇳 Shanghai, China</option>
                                <option value="Los Angeles">🇺🇸 Los Angeles, USA</option>
                            </select>

                            <button
                                onClick={() => startKpopAudition(auditionLocation, 8)}
                                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-pink-600/20 flex items-center gap-1.5 shrink-0"
                            >
                                <Plus size={16} /> Scout Trainees
                            </button>
                        </div>
                    </div>

                    {/* Trainee Roster Grid */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                <Users size={20} className="text-purple-400" /> Agency Trainee Academy ({activeTrainees.length})
                            </h2>
                            <p className="text-xs text-slate-400">
                                Trainees gain weekly stat growth based on potential and focus. Weekly burn rate: ¥300,000/trainee.
                            </p>
                        </div>

                        {activeTrainees.length >= 3 && (
                            <button
                                onClick={() => {
                                    setSelectedTraineesForDebut([]);
                                    setDebutGroupName('');
                                    setDebutConcept('Girl Crush');
                                    setShowModal('kpopDebutPlanner');
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
                            >
                                <Sparkles size={16} /> Launch Debut Showcase
                            </button>
                        )}
                    </div>

                    {activeTrainees.length === 0 ? (
                        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 space-y-3">
                            <Users size={48} className="mx-auto text-slate-600" />
                            <h4 className="text-base font-semibold text-slate-300">No Active Trainees in Academy</h4>
                            <p className="text-xs max-w-md mx-auto">
                                Host a Global Audition in Seoul, Tokyo, Bangkok, or Los Angeles to scout rising stars into your agency academy.
                            </p>
                            <button
                                onClick={() => startKpopAudition(auditionLocation, 8)}
                                className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-lg mt-2 inline-flex items-center gap-1.5"
                            >
                                <Globe size={14} /> Scout First Trainee Class
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {activeTrainees.map((trainee) => (
                                <div
                                    key={trainee.id}
                                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3 shadow-lg"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-slate-100 text-base">{trainee.name}</h4>
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border uppercase tracking-wider ${getPotentialColor(trainee.potential)}`}>
                                                    Tier {trainee.potential}
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-400 mt-0.5">
                                                {trainee.age} yrs • {trainee.nationality || 'Korean'} • <span className={`px-1.5 py-0.2 rounded text-[10px] font-medium border uppercase ${getSpecialityColor(trainee.speciality)}`}>{trainee.speciality}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-center">
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-medium">🎤 Rap</div>
                                            <div className="text-sm font-bold text-rose-400">{trainee.rapping || 0}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-medium">🎵 Vocal</div>
                                            <div className="text-sm font-bold text-cyan-400">{trainee.singing || 0}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-medium">💃 Dance</div>
                                            <div className="text-sm font-bold text-emerald-400">{trainee.dancing || 0}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-medium">✨ Visual</div>
                                            <div className="text-sm font-bold text-pink-400">{trainee.visual || 0}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-medium">👑 Charisma</div>
                                            <div className="text-sm font-bold text-amber-400">{trainee.charisma || 0}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-medium">📺 Variety</div>
                                            <div className="text-sm font-bold text-indigo-400">{trainee.variety || 0}</div>
                                        </div>
                                    </div>

                                    {/* Training Focus Selector */}
                                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                                        <span className="text-slate-400">Focus:</span>
                                        <select
                                            value={trainee.trainingFocus || 'balanced'}
                                            onChange={(e) => setTraineeFocus(trainee.id, e.target.value)}
                                            className="bg-slate-800 text-slate-200 text-xs rounded px-2 py-1 border border-slate-700"
                                        >
                                            <option value="balanced">Balanced (+all)</option>
                                            <option value="rapping">🔥 Rapping Specialist</option>
                                            <option value="singing">🎤 Vocal Precision</option>
                                            <option value="dancing">💃 Dance Mastery</option>
                                            <option value="visual">✨ Visual & Image</option>
                                            <option value="variety">📺 Media / Variety</option>
                                        </select>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                                        <span className="text-[11px] text-slate-500">
                                            {trainee.trainingWeeksCompleted || 0} weeks trained
                                        </span>
                                        <button
                                            onClick={() => releaseTrainee(trainee.id)}
                                            className="text-red-400 hover:text-red-300 text-[11px] font-medium transition-colors"
                                        >
                                            Terminate Contract
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ======================================================== */}
            {/* 2. GROUPS & COMEBACKS VIEW */}
            {/* ======================================================== */}
            {activeSection === 'comebacks' && (
                <div className="space-y-6">
                    {/* Active Groups Overview */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                <Flame size={20} className="text-pink-400" /> Active K-Pop Groups ({kpopGroups.length})
                            </h2>
                            <p className="text-xs text-slate-400">
                                Launch high-concept album comebacks, produce blockbuster music videos, and chart globally on Melon.
                            </p>
                        </div>
                    </div>

                    {kpopGroups.length === 0 ? (
                        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 space-y-3">
                            <Sparkles size={48} className="mx-auto text-slate-600" />
                            <h4 className="text-base font-semibold text-slate-300">No Debuted K-Pop Groups Yet</h4>
                            <p className="text-xs max-w-md mx-auto">
                                Train your recruited candidates in the Academy and organize a Debut Evaluation showcase to form your first official K-Pop Girl Group.
                            </p>
                            <button
                                onClick={() => setActiveSection('academy')}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg mt-2 inline-flex items-center gap-1.5"
                            >
                                <Users size={14} /> Go to Trainee Academy
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {kpopGroups.map(group => {
                                const membersList = group.members || [];
                                const avgRap = membersList.length ? Math.round(membersList.reduce((s, m) => s + (m.rapping || 0), 0) / membersList.length) : 0;
                                const avgDance = membersList.length ? Math.round(membersList.reduce((s, m) => s + (m.dancing || 0), 0) / membersList.length) : 0;
                                const avgVocal = membersList.length ? Math.round(membersList.reduce((s, m) => s + (m.singing || 0), 0) / membersList.length) : 0;

                                return (
                                    <div
                                        key={group.id}
                                        className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/20 shadow-xl space-y-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase">
                                                    {group.concept || 'Girl Crush'}
                                                </span>
                                                <h3 className="text-xl font-black text-slate-100 mt-1">{group.name}</h3>
                                                <p className="text-xs text-slate-400">
                                                    {membersList.length} members • {(group.fans || 0).toLocaleString()} global fans
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setSelectedComebackGroupId(String(group.id));
                                                    setComebackTitle('');
                                                    setComebackBSides(['', '']);
                                                    setComebackConcept(group.concept || 'Girl Crush');
                                                    setShowModal('kpopComebackPlanner');
                                                }}
                                                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-pink-600/20 flex items-center gap-1.5"
                                            >
                                                <Flame size={16} /> Plan Comeback
                                            </button>
                                        </div>

                                        {/* Skill Averages */}
                                        <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
                                            <div>
                                                <div className="text-[10px] text-slate-400">Group Rap Avg</div>
                                                <div className="text-sm font-bold text-rose-400">{avgRap}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-slate-400">Group Dance Avg</div>
                                                <div className="text-sm font-bold text-emerald-400">{avgDance}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-slate-400">Group Vocal Avg</div>
                                                <div className="text-sm font-bold text-cyan-400">{avgVocal}</div>
                                            </div>
                                        </div>

                                        {/* Roster preview */}
                                        <div className="space-y-1.5">
                                            <div className="text-xs font-semibold text-slate-300">Roster ({membersList.length})</div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {membersList.map(m => (
                                                    <span key={m.id} className="px-2 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-xs text-slate-200 flex items-center gap-1">
                                                        <span className="font-bold">{m.name}</span>
                                                        <span className="text-[10px] text-rose-400 font-mono">R{m.rapping || 0}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Comeback History / Releases */}
                    {kpopComebacks.length > 0 && (
                        <div className="space-y-3 pt-4">
                            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                                <Music size={18} className="text-purple-400" /> Comeback Discography & Streaming Performance
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {kpopComebacks.map(cb => (
                                    <div key={cb.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="text-xs text-pink-400 font-bold">{cb.groupName}</div>
                                                <div className="text-base font-black text-slate-100">{cb.titleTrack}</div>
                                                <div className="text-xs text-slate-400">Concept: {cb.concept} • Wk {cb.releaseWeek}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-slate-400">Melon Rank</div>
                                                <div className="text-lg font-black text-emerald-400">#{cb.melonScore}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800 text-slate-300">
                                            <span>Streams: {(cb.totalStreams || 0).toLocaleString()}</span>
                                            <span className="text-emerald-400 font-bold">¥{(cb.streamingRevenue || 0).toLocaleString()} earned</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ======================================================== */}
            {/* 3. MELON GLOBAL TOP 100 CHART */}
            {/* ======================================================== */}
            {activeSection === 'chart' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                <TrendingUp size={20} className="text-emerald-400" /> Melon Global Real-Time Top 100
                            </h2>
                            <p className="text-xs text-slate-400">
                                The official Korean and global music streaming chart. Top songs generate recurring weekly streaming revenue.
                            </p>
                        </div>
                    </div>

                    {melonChart.length === 0 ? (
                        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 space-y-2">
                            <TrendingUp size={48} className="mx-auto text-slate-600" />
                            <h4 className="text-base font-semibold text-slate-300">Chart Empty</h4>
                            <p className="text-xs">Release a K-Pop Comeback with high rap and dance synergy to debut on the Melon Top 100.</p>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
                            <div className="grid grid-cols-12 gap-2 p-3 bg-slate-950/80 text-xs font-bold text-slate-400 border-b border-slate-800">
                                <div className="col-span-1 text-center">#</div>
                                <div className="col-span-5">Song / Artist</div>
                                <div className="col-span-2 text-center">Concept</div>
                                <div className="col-span-2 text-center">Streams</div>
                                <div className="col-span-2 text-right pr-2">Peak</div>
                            </div>

                            <div className="divide-y divide-slate-800/60">
                                {melonChart.map((entry, idx) => (
                                    <div
                                        key={idx}
                                        className={`grid grid-cols-12 gap-2 p-3 items-center text-xs transition-colors ${
                                            entry.rank <= 3
                                                ? 'bg-amber-500/5 hover:bg-amber-500/10'
                                                : entry.rank <= 10
                                                ? 'bg-purple-500/5 hover:bg-purple-500/10'
                                                : 'hover:bg-slate-800/40'
                                        }`}
                                    >
                                        <div className="col-span-1 text-center font-black">
                                            {entry.rank === 1 ? '🥇 1' : entry.rank === 2 ? '🥈 2' : entry.rank === 3 ? '🥉 3' : `#${entry.rank}`}
                                        </div>
                                        <div className="col-span-5">
                                            <div className="font-bold text-slate-100 text-sm">{entry.title}</div>
                                            <div className="text-slate-400 text-[11px]">{entry.artist}</div>
                                        </div>
                                        <div className="col-span-2 text-center">
                                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                                                {entry.concept || 'K-Pop'}
                                            </span>
                                        </div>
                                        <div className="col-span-2 text-center font-mono text-emerald-400 font-bold">
                                            {(entry.streams || 0).toLocaleString()}
                                        </div>
                                        <div className="col-span-2 text-right pr-2 font-bold text-slate-300">
                                            Peak #{entry.peak || entry.rank}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ======================================================== */}
            {/* 4. CONTRACT MANAGEMENT VIEW */}
            {/* ======================================================== */}
            {activeSection === 'contracts' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                                <Shield size={20} className="text-blue-400" /> K-Pop Idol Contract Management ({kpopMembers.length})
                            </h2>
                            <p className="text-xs text-slate-400">
                                K-Pop idols sign exclusive 3-year term contracts. As terms approach expiration, negotiate extensions or release members.
                            </p>
                        </div>
                    </div>

                    {kpopMembers.length === 0 ? (
                        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 space-y-2">
                            <Shield size={48} className="mx-auto text-slate-600" />
                            <h4 className="text-base font-semibold text-slate-300">No Contracted K-Pop Members</h4>
                            <p className="text-xs">Debuted K-Pop idols will appear here with active contract duration and salary terms.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {kpopMembers.map(m => {
                                const endWk = (m.contractStartWeek || 1) + (m.contractDurationWeeks || 156);
                                const weeksLeft = Math.max(0, endWk - week);
                                const isExpiring = weeksLeft <= 8;
                                const isExpired = weeksLeft === 0;

                                return (
                                    <div
                                        key={m.id}
                                        className={`p-4 rounded-2xl bg-slate-900/90 border space-y-3 shadow-lg ${
                                            isExpired
                                                ? 'border-red-500/80 shadow-red-500/10'
                                                : isExpiring
                                                ? 'border-amber-500/80 shadow-amber-500/10'
                                                : 'border-slate-800'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="text-xs text-purple-400 font-semibold">{m.groupName}</div>
                                                <div className="text-base font-bold text-slate-100">{m.name}</div>
                                                <div className="text-xs text-slate-400">{m.archetype || 'Idol'} • Age {m.age || 19}</div>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                                isExpired
                                                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                                                    : isExpiring
                                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                            }`}>
                                                {isExpired ? 'Expired' : isExpiring ? `${weeksLeft}w left` : 'Active'}
                                            </span>
                                        </div>

                                        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-xs space-y-1">
                                            <div className="flex justify-between text-slate-400">
                                                <span>Contract Term:</span>
                                                <span className="font-bold text-slate-200">{weeksLeft} / {m.contractDurationWeeks || 156} weeks ({(weeksLeft / 52).toFixed(1)} yrs)</span>
                                            </div>
                                            <div className="flex justify-between text-slate-400">
                                                <span>Salary:</span>
                                                <span className="font-bold text-amber-400">¥{(m.salary || 1500000).toLocaleString()}/mo</span>
                                            </div>
                                            <div className="flex justify-between text-slate-400">
                                                <span>Morale / Stress:</span>
                                                <span className="font-bold text-slate-200">{m.morale || 80}% / {m.stress || 10}%</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setSelectedMemberForContract(m);
                                                setShowModal('kpopContractModal');
                                            }}
                                            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1 transition-colors"
                                        >
                                            <Shield size={14} /> Renegotiate Contract
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* ======================================================== */}
            {/* MODALS */}
            {/* ======================================================== */}

            {/* 1. Global Audition Candidate Draft Modal */}
            {showModal === 'kpopTraineeDraft' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                                    <Globe size={20} className="text-pink-400" /> K-Pop Global Audition Draft — {modalData?.location || 'Seoul'}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Select the candidates you want to sign into the Agency Trainee Academy.
                                </p>
                            </div>
                            <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(modalData?.candidates || []).map((candidate) => {
                                const isSelected = selectedTraineesForDebut.includes(candidate.id);
                                return (
                                    <div
                                        key={candidate.id}
                                        onClick={() => {
                                            if (isSelected) {
                                                setSelectedTraineesForDebut(prev => prev.filter(id => id !== candidate.id));
                                            } else {
                                                setSelectedTraineesForDebut(prev => [...prev, candidate.id]);
                                            }
                                        }}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                                            isSelected
                                                ? 'bg-purple-950/40 border-pink-500 shadow-lg shadow-pink-500/10'
                                                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-100">{candidate.name}</span>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${getPotentialColor(candidate.potential)}`}>
                                                        Tier {candidate.potential}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {candidate.age} yrs • {candidate.nationality} • <span className={`px-1.5 py-0.2 rounded text-[10px] font-medium border ${getSpecialityColor(candidate.speciality)}`}>{candidate.speciality}</span>
                                                </div>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-pink-500 border-pink-400 text-white' : 'border-slate-700'}`}>
                                                {isSelected && <Check size={12} />}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-1.5 bg-slate-900/80 p-2 rounded-lg text-center text-xs">
                                            <div><span className="text-[10px] text-slate-400 block">Rap</span> <span className="font-bold text-rose-400">{candidate.rapping}</span></div>
                                            <div><span className="text-[10px] text-slate-400 block">Vocal</span> <span className="font-bold text-cyan-400">{candidate.singing}</span></div>
                                            <div><span className="text-[10px] text-slate-400 block">Dance</span> <span className="font-bold text-emerald-400">{candidate.dancing}</span></div>
                                            <div><span className="text-[10px] text-slate-400 block">Visual</span> <span className="font-bold text-pink-400">{candidate.visual}</span></div>
                                            <div><span className="text-[10px] text-slate-400 block">Charisma</span> <span className="font-bold text-amber-400">{candidate.charisma}</span></div>
                                            <div><span className="text-[10px] text-slate-400 block">Variety</span> <span className="font-bold text-indigo-400">{candidate.variety}</span></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                                {selectedTraineesForDebut.length} candidate(s) selected
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowModal(null)}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        confirmKpopTraineeRecruitment(selectedTraineesForDebut);
                                        setSelectedTraineesForDebut([]);
                                    }}
                                    disabled={selectedTraineesForDebut.length === 0}
                                    className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg disabled:opacity-50"
                                >
                                    Sign Selected ({selectedTraineesForDebut.length})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Debut Planner Modal */}
            {showModal === 'kpopDebutPlanner' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                                    <Sparkles size={20} className="text-pink-400" /> K-Pop Debut Evaluation & Formation
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Select trainees to debut, choose a group name, and lock in your debut concept.
                                </p>
                            </div>
                            <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-5 overflow-y-auto flex-1 space-y-4">
                            {/* Group Name & Concept Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Group Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Nova-X, Velvet-9, Eclipse"
                                        value={debutGroupName}
                                        onChange={(e) => setDebutGroupName(e.target.value)}
                                        className="w-full bg-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-pink-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Debut Concept</label>
                                    <select
                                        value={debutConcept}
                                        onChange={(e) => setDebutConcept(e.target.value)}
                                        className="w-full bg-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-pink-500"
                                    >
                                        {kpopConcepts.map(c => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Select Target Existing Group or Form New */}
                            {kpopGroups.length > 0 && (
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Destination Group</label>
                                    <select
                                        value={targetGroupId}
                                        onChange={(e) => setTargetGroupId(e.target.value)}
                                        className="w-full bg-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700"
                                    >
                                        <option value="">✨ Form New K-Pop Girl Group</option>
                                        {kpopGroups.map(g => (
                                            <option key={g.id} value={g.id}>Add to existing: {g.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Select Trainees to Debut */}
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-2">
                                    Select Debuting Trainees ({selectedTraineesForDebut.length} selected)
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1">
                                    {activeTrainees.map(t => {
                                        const isSel = selectedTraineesForDebut.includes(t.id);
                                        return (
                                            <div
                                                key={t.id}
                                                onClick={() => {
                                                    if (isSel) setSelectedTraineesForDebut(prev => prev.filter(id => id !== t.id));
                                                    else setSelectedTraineesForDebut(prev => [...prev, t.id]);
                                                }}
                                                className={`p-2.5 rounded-xl border cursor-pointer text-xs flex items-center justify-between ${
                                                    isSel
                                                        ? 'bg-pink-950/40 border-pink-500 text-white'
                                                        : 'bg-slate-950/60 border-slate-800 text-slate-300'
                                                }`}
                                            >
                                                <div>
                                                    <div className="font-bold">{t.name}</div>
                                                    <div className="text-[10px] text-slate-400">
                                                        Rap {t.rapping || 0} • Vocal {t.singing || 0} • Dance {t.dancing || 0}
                                                    </div>
                                                </div>
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSel ? 'bg-pink-500 border-pink-400' : 'border-slate-700'}`}>
                                                    {isSel && <Check size={10} />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                                Debuting {selectedTraineesForDebut.length} idol(s)
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowModal(null)}
                                    className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        finishKpopDebut(selectedTraineesForDebut, debutGroupName || "Nova-X", debutConcept, targetGroupId || null);
                                        setSelectedTraineesForDebut([]);
                                    }}
                                    disabled={selectedTraineesForDebut.length === 0}
                                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-lg disabled:opacity-50"
                                >
                                    Official Debut!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 3. Comeback Planner Modal */}
            {showModal === 'kpopComebackPlanner' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                                    <Flame size={20} className="text-pink-400" /> K-Pop Comeback Production Studio
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Formulate title track, B-sides, concept synergy, and MV production budget.
                                </p>
                            </div>
                            <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-5 overflow-y-auto flex-1 space-y-4">
                            {/* Group & Title */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Comeback Group</label>
                                    <select
                                        value={selectedComebackGroupId}
                                        onChange={(e) => setSelectedComebackGroupId(e.target.value)}
                                        className="w-full bg-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700"
                                    >
                                        {kpopGroups.map(g => (
                                            <option key={g.id} value={g.id}>{g.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Title Track Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Supernova, Drama, Kill This Love"
                                        value={comebackTitle}
                                        onChange={(e) => setComebackTitle(e.target.value)}
                                        className="w-full bg-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700"
                                    />
                                </div>
                            </div>

                            {/* Concept & MV Tier */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">Comeback Concept</label>
                                    <select
                                        value={comebackConcept}
                                        onChange={(e) => setComebackConcept(e.target.value)}
                                        className="w-full bg-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700"
                                    >
                                        {kpopConcepts.map(c => (
                                            <option key={c.id} value={c.id}>{c.label} ({c.req})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1">MV Production Budget</label>
                                    <select
                                        value={comebackMvTier}
                                        onChange={(e) => setComebackMvTier(e.target.value)}
                                        className="w-full bg-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700"
                                    >
                                        <option value="budget">Budget Performance Video (¥1,000,000)</option>
                                        <option value="standard">Standard Cinematic Studio MV (¥3,000,000)</option>
                                        <option value="blockbuster">Blockbuster CGI Global MV (¥8,000,000)</option>
                                    </select>
                                </div>
                            </div>

                            {/* B-Sides input */}
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">B-Side Tracks (¥500,000 each)</label>
                                <div className="space-y-2">
                                    {comebackBSides.map((bTrack, bIdx) => (
                                        <div key={bIdx} className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder={`B-Side Track #${bIdx + 1}`}
                                                value={bTrack}
                                                onChange={(e) => {
                                                    const updated = [...comebackBSides];
                                                    updated[bIdx] = e.target.value;
                                                    setComebackBSides(updated);
                                                }}
                                                className="w-full bg-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700"
                                            />
                                            {comebackBSides.length > 1 && (
                                                <button
                                                    onClick={() => setComebackBSides(prev => prev.filter((_, i) => i !== bIdx))}
                                                    className="px-2.5 py-1 text-red-400 hover:text-red-300 text-xs border border-red-500/30 rounded-lg"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {comebackBSides.length < 4 && (
                                        <button
                                            onClick={() => setComebackBSides(prev => [...prev, ''])}
                                            className="text-xs text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1 mt-1"
                                        >
                                            <Plus size={14} /> Add Another B-Side
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                                Title Track: ¥2,500,000 + B-Sides & MV
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowModal(null)}
                                    className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const cleanBSides = comebackBSides.filter(b => b.trim().length > 0);
                                        releaseKpopComeback({
                                            groupId: selectedComebackGroupId || (kpopGroups[0]?.id),
                                            titleSongName: comebackTitle || 'Supernova',
                                            bSides: cleanBSides,
                                            concept: comebackConcept,
                                            mvTier: comebackMvTier,
                                            promoWeeks: 4
                                        });
                                    }}
                                    className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-pink-600/25"
                                >
                                    Release Comeback!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. Comeback Result Celebration Modal */}
            {showModal === 'kpopComebackResult' && modalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-pink-500/40 rounded-2xl max-w-lg w-full p-6 text-center shadow-2xl space-y-4 animate-in zoom-in-95">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/30">
                            <Trophy size={32} />
                        </div>

                        <div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase">
                                Melon Global Debut
                            </span>
                            <h3 className="text-2xl font-black text-slate-100 mt-2">
                                #{modalData.melonScore} on Melon Top 100!
                            </h3>
                            <p className="text-sm font-semibold text-purple-300 mt-1">
                                {modalData.groupName} — "{modalData.titleTrack}"
                            </p>
                        </div>

                        {modalData.conceptBonus && (
                            <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-500/30 text-xs text-purple-200 font-semibold">
                                {modalData.conceptBonus}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
                            <div>
                                <div className="text-[10px] text-slate-400">Digital Revenue</div>
                                <div className="text-sm font-bold text-emerald-400">¥{(modalData.streamingRevenue || 0).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400">New Global Fans</div>
                                <div className="text-sm font-bold text-pink-400">+{(modalData.fanGain + modalData.intlGain || 0).toLocaleString()}</div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowModal(null)}
                            className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold rounded-xl shadow-lg"
                        >
                            Back to Agency
                        </button>
                    </div>
                </div>
            )}

            {/* 5. Contract Renegotiation Modal */}
            {showModal === 'kpopContractModal' && selectedMemberForContract && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div>
                                <h3 className="text-base font-bold text-slate-100">Exclusive Contract Renewal</h3>
                                <p className="text-xs text-slate-400">{selectedMemberForContract.name} ({selectedMemberForContract.groupName})</p>
                            </div>
                            <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-2.5 text-xs">
                            <button
                                onClick={() => renegotiateKpopContract(selectedMemberForContract.id, 'renew_1yr')}
                                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left transition-colors flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-bold text-slate-200">1-Year Extension (+52 Weeks)</div>
                                    <div className="text-[11px] text-slate-400">+25% Monthly Salary adjustment</div>
                                </div>
                                <ChevronRight size={16} className="text-slate-500" />
                            </button>

                            <button
                                onClick={() => renegotiateKpopContract(selectedMemberForContract.id, 'renew_2yr')}
                                className="w-full p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-left transition-colors flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-bold text-slate-200">2-Year Extension (+104 Weeks)</div>
                                    <div className="text-[11px] text-slate-400">+35% Monthly Salary adjustment, +Morale</div>
                                </div>
                                <ChevronRight size={16} className="text-slate-500" />
                            </button>

                            <button
                                onClick={() => renegotiateKpopContract(selectedMemberForContract.id, 'renew_3yr')}
                                className="w-full p-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-left transition-colors flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-bold text-pink-300">3-Year Long-Term Contract (+156 Weeks)</div>
                                    <div className="text-[11px] text-purple-200">+50% Salary adjustment, Maximum Morale boost</div>
                                </div>
                                <ChevronRight size={16} className="text-pink-400" />
                            </button>

                            <button
                                onClick={() => renegotiateKpopContract(selectedMemberForContract.id, 'release')}
                                className="w-full p-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-left transition-colors flex items-center justify-between text-red-300"
                            >
                                <div>
                                    <div className="font-bold">Conclude Contract & Respectful Departure</div>
                                    <div className="text-[11px] text-red-400/80">Member leaves agency peacefully without scandal</div>
                                </div>
                                <ChevronRight size={16} className="text-red-400" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
