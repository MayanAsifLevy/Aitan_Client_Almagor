
export const formatPercentage = (value) => {
        let formatted;
        if (value) {
          let converted = Math.round(value * 100);
          formatted = converted === 0 ? "-" : `${converted}%`;
        } else {
          formatted = "-";
        }
        return formatted;
};
