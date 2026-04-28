export function formatTime(ms: number): string {
    const totalSeconds = ms / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((ms % 1000) / 10);
  
    const ss = String(seconds).padStart(2, '0');
    const cs = String(centiseconds).padStart(2, '0');
  
    let result = `${ss}.${cs}`;
    if (minutes > 0 || hours > 0) result = `${String(minutes).padStart(2, '0')}:${result}`;
    if (hours > 0) result = `${hours}:${result}`;
  
    return result;
  }