const cpfCnpjPipe = (cpfCnpj) => {
    if (cpfCnpj) {
        cpfCnpj = cpfCnpj.toString();
        if (cpfCnpj.length <= 11) {
            return cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
        } else {
            return cpfCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
        }
    }

    return;
}

export default cpfCnpjPipe;