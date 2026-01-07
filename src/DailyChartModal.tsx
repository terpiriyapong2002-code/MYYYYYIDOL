import { ChevronUp, ChevronDown } from 'lucide-react';

// Define the structure for a single entry in the chart
interface ChartEntry {
    id: string | number;
    isPlayer: boolean;
    artist: string;
    songName: string;
    totalSales: number;
    lastRank: number;
    currentRank: number;
}

// Define the structure for the active chart object
interface ActiveChart {
    week: number;
    entries: ChartEntry[];
}

// Define the props for our component
interface DailyChartModalProps {
    activeChart: ActiveChart | null;
    onHide: () => void;
}

const DailyChartModal = ({ activeChart, onHide }: DailyChartModalProps) => {
    if (!activeChart) return null;

    return (
        <div className="fixed inset-0 bg-pink-500/10 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-in fade-in">
            <div className="w-full max-w-5xl max-h-[90vh] flex flex-col bg-gradient-to-br from-pink-50 via-white to-white dark:from-pink-900/50 dark:via-gray-900 dark:to-gray-900 rounded-2xl border-2 border-white dark:border-pink-800/50 shadow-2xl shadow-pink-500/10">
                <div className="flex-shrink-0 p-4 border-b border-pink-200 dark:border-pink-800/80 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-pink-800 dark:text-pink-300 tracking-wider">
                        Weekly Chart <span className="text-pink-500 font-mono">| Week {activeChart.week + 1}/8</span>
                    </h2>
                    <button onClick={onHide} className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-800/50 hover:bg-pink-200 dark:hover:bg-pink-700 text-pink-700 dark:text-pink-200 flex items-center justify-center font-bold text-xl">&times;</button>
                </div>
                <div className="overflow-y-auto p-2">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-pink-600 dark:text-pink-400 uppercase">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-center">Rank</th>
                                <th scope="col" className="px-6 py-3">Artist</th>
                                <th scope="col" className="px-6 py-3">Song Title</th>
                                <th scope="col" className="px-6 py-3 text-right">Total Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeChart.entries.map((entry) => {
                                const isPlayer = entry.isPlayer;
                                const rankChange = entry.lastRank > 0 ? entry.lastRank - entry.currentRank : 0;

                                let rankDisplay;
                                if (entry.lastRank === 0) {
                                    rankDisplay = <span className="font-bold text-yellow-500">NEW</span>;
                                } else if (rankChange > 0) {
                                    rankDisplay = <span className="font-bold text-green-500 flex items-center justify-center gap-1"><ChevronUp size={16} /> {rankChange}</span>;
                                } else if (rankChange < 0) {
                                    rankDisplay = <span className="font-bold text-red-500 flex items-center justify-center gap-1"><ChevronDown size={16} /> {Math.abs(rankChange)}</span>;
                                } else {
                                    rankDisplay = <span className="text-gray-400 dark:text-gray-500">-</span>;
                                }

                                return (
                                    <tr key={entry.id} className={`border-b border-pink-100 dark:border-pink-900/50 transition-colors duration-300 ${isPlayer ? 'bg-pink-100 dark:bg-pink-900/80' : 'hover:bg-pink-50 dark:hover:bg-pink-900/30'}`}>
                                        <td className="px-4 py-3 font-medium text-center">
                                            <div className="flex items-center justify-center space-x-3">
                                                <span className={`font-bold text-lg w-8 ${entry.currentRank <= 3 ? 'text-yellow-500' : 'text-pink-700 dark:text-pink-300'}`}>{entry.currentRank}</span>
                                                <div className="w-12 text-center text-xs">{rankDisplay}</div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-3 font-semibold ${isPlayer ? 'text-pink-800 dark:text-pink-200' : 'text-gray-800 dark:text-gray-200'}`}>{entry.artist}</td>
                                        <td className={`px-6 py-3 italic ${isPlayer ? 'text-pink-700 dark:text-pink-300' : 'text-gray-600 dark:text-gray-400'}`}>"{entry.songName}"</td>
                                        <td className="px-6 py-3 text-right font-mono text-lg text-gray-800 dark:text-gray-200">{entry.totalSales.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DailyChartModal;
