import { Link } from "react-router-dom";

const inputBaseClass = "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline";
const labelBaseClass = "block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2";
const focusRingClass = "focus:border-red-500 focus:ring-1 focus:ring-red-500";
const borderColorClass = "border-red-300 dark:border-red-700";
const textColorClass = "text-zinc-700 dark:text-zinc-300";
const errorInputClass = `${inputBaseClass} border-red-300 dark:border-red-700 text-zinc-700 dark:text-zinc-300`;

function SignUpForm() {
  return (
    <form className="w-full max-w-lg bg-white dark:bg-zinc-800 shadow-md rounded-lg px-10 pt-6 pb-6 mb-0 shadow-red-500/50 dark:shadow-red-800/50">
      <InputField type="text" placeholder="Usuario" id="username" inputClass={`${inputBaseClass} ${borderColorClass} ${textColorClass} ${focusRingClass}`} labelClass={labelBaseClass} />
      <InputField type="password" placeholder="******************" id="password" inputClass={`${inputBaseClass} ${borderColorClass} ${textColorClass} ${focusRingClass}`} labelClass={labelBaseClass} />
      <DualInputField inputBaseClass={inputBaseClass} labelBaseClass={labelBaseClass} focusRingClass={focusRingClass} borderColorClass={borderColorClass} textColorClass={textColorClass} />  
      <InputField label="Fecha de nacimiento" type="date" id="birthdate" inputClass={`${inputBaseClass} ${borderColorClass} ${textColorClass} ${focusRingClass}`} labelClass={labelBaseClass} />
      <PhoneCountryInput inputBaseClass={inputBaseClass} labelBaseClass={labelBaseClass} focusRingClass={focusRingClass} borderColorClass={borderColorClass} textColorClass={textColorClass} />
      
      <SubmitSection />
    </form>
  );
}

function InputField({ label, type, id, placeholder, inputClass, labelClass }) {
  return (
    <div className="mb-4">
      <label className={labelClass} htmlFor={id}>{label}</label>
      <input className={inputClass} id={id} type={type} placeholder={placeholder} />
    </div>
  );
}

function PhoneCountryInput({ inputBaseClass, labelBaseClass, focusRingClass, borderColorClass, textColorClass }) {
  return (
    <div className="mb-4 flex">
      <div className="w-1/4 pr-2">
        <label className={labelBaseClass}>País</label>
        <select className={`${inputBaseClass} ${borderColorClass} ${textColorClass} bg-white dark:bg-zinc-700 ${focusRingClass}`}>
          <option>+1 USA</option>
          <option>+34 España</option>
          <option>+52 México</option>
          <option>+54 Argentina</option>
        </select>
      </div>
      <div className="w-3/4 pl-2">
        <InputField label="Teléfono" type="tel" id="phone" placeholder="3434626177" inputClass={`${inputBaseClass} ${borderColorClass} ${textColorClass} ${focusRingClass}`} labelClass={labelBaseClass} />
      </div>
    </div>
  );
}

function DualInputField({ inputBaseClass, labelBaseClass, focusRingClass, borderColorClass, textColorClass }) {
  return (
    <div className="mb-4 flex">
      <div className="w-1/2 mr-2">
        <input id = "email1" className={`${inputBaseClass} ${borderColorClass} ${textColorClass} ${focusRingClass}`} placeholder="Correo" />
        </div>
      <SelectField id="email2" options={[
            {label: "@gmail.com"},
            {label: "@example.com"},
            {label: "@website.com"}
          ]} />
    </div>
    
  );
}
const SelectField = ({ id, options }) => (
    <div className="w-1/2 ml-2">
      <select className={`${errorInputClass} bg-white dark:bg-zinc-700`} id={id}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
);
function SubmitSection() {
  return (
    <div className="flex items-center justify-between">
      <button className="bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Registrarse
      </button>
      <Link to="../logIn" className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800 dark:text-red-300 dark:hover:text-red-500">
        ¿Ya posee una cuenta?
      </Link>
    </div>
  );
}

export default SignUpForm;