var PI =Math.PI;

console.log("El valor de PI es: " + PI);

exports.area = function(radio) {
    return PI * radio * radio;
}

exports.perimetro = function(radio) {
    return 2 * PI * radio;
}
