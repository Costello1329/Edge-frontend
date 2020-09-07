export const formatSalary =
  (salary: number): string => {
    if (salary < 1000)
      return salary.toString();

    let digits: string[] =
      salary.toString().split('');

    let formatted: string = "";

    for (let i = 0; i < digits.length - 3; ++ i)
      formatted += digits[i];

    formatted += "\u2009";

    for (let i = digits.length - 3; i < digits.length; ++ i)
      formatted += digits[i];

    return formatted;
  };
