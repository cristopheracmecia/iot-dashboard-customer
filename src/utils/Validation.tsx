import * as Yup from "yup";
export function validateRUC(ruc: number) : boolean {
    //11 dígitos y empieza en 10,15,16,17 o 20
    if (!(ruc >= 1e10 && ruc < 11e9
        || ruc >= 15e9 && ruc < 18e9
        || ruc >= 2e10 && ruc < 21e9))
        return false;

    for (var suma = -(ruc%10<2), i = 0; i<11; i++, ruc = ruc/10|0)
        suma += (ruc % 10) * (i % 7 + (i/7|0) + 1);
    return suma % 11 === 0;
}

const addValidations = () => {
    Yup.addMethod(Yup.string, "ruc", function (errorMessage) {
        return this.test(`test-ruc-type`, errorMessage, function (value) {
            const { path, createError } = this;
            return (
                //convert value to number
                (!!value && validateRUC(Number.parseInt(value))) ||
                createError({ path, message: errorMessage })
            );
        });
    });
}

module.exports = addValidations();