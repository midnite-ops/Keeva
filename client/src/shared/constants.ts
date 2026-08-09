export const inputCls = "w-full px-4 py-3 rounded-xl text-sm text-gray-900 outline-none transition-all bg-[#f9f8f6] border-[1.5px] border-[#eeeae4]";

export const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = "#111";
  e.target.style.background = "#fff";
};

export const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = "#eeeae4";
  e.target.style.background = "#f9f8f6";
};
