function CalcularEdad(nacimiento){
    let actual = new Date().getFullYear();
    return actual - nacimiento;
}

export default CalcularEdad
