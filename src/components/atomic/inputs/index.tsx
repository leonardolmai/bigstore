import React,{Fragment} from 'react';
interface InputFieldProps {
  label: string;
  name: string;
  id: string;
  style: "input-text-sales";
  size: "small" | "medium" | "large"
}




export function InputField({label,name,id,style,size}:InputFieldProps){
// const InputField: React.FC<InputFieldProps> = ({ label, name, id,style,size }) => {
  let inputclassSize= ''
  let classnames ={
    div : '',
    input : '',
    autocomplete : '',
  }
  let  inputtype = ''
  if (size === "small"){
    inputclassSize = 'w-72';
  }else if (size === "medium"){
    inputclassSize = 'w-72'
  }else if (size === "large"){
    inputclassSize = 'w-72'
  }

  

  if (style === "input-text-sales"  ){
    classnames.div =  "flex flex-col font-bold"
    classnames.input = "bg-[#E8E8E8] font-light text-[#6B6B6B] mt-3 mb-3 border rounded-md shadow-md outline-4 focus:outline-[#FEBD2F] px-3 "
    
    inputtype = 'text'
  }
  
  
  return (
    <div className={`${classnames.div}`}>
      <label htmlFor={id}>{label}</label>
      <input className={`${inputclassSize} ${classnames.input}`} type={inputtype} name={name} id={id} required autoComplete={classnames.autocomplete}/>
    </div>
  );
};

{/*export default InputField;*/}