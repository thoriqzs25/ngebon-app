export const imageSource = (name: string) => {
  switch (name) {
    case 'logo':
      return require('@src/assets/images/ngebon-app-logo.webp');
    case 'tree-1':
      return require('@src/assets/images/tree_1.webp');
    case 'tree-2':
      return require('@src/assets/images/tree_2.webp');
    case 'tree-3':
      return require('@src/assets/images/tree_3.webp');
    case 'tree-4':
      return require('@src/assets/images/tree_4.webp');
    case 'tree-5':
      return require('@src/assets/images/tree_5.webp');
    case 'tree-6':
      return require('@src/assets/images/tree_6.webp');
    case 'tree-7':
      return require('@src/assets/images/tree_7.webp');
    case 'gopay':
      return require('@src/assets/images/GOPAY.webp');
    case 'ovo':
      return require('@src/assets/images/OVO.webp');
    case 'bca':
      return require('@src/assets/images/BCA.webp');
    case 'bni':
      return require('@src/assets/images/BNI.webp');
    case 'dana':
      return require('@src/assets/images/DANA.webp');
    case 'shopeepay':
      return require('@src/assets/images/SHOPEEPAY.webp');
    case 'jago':
      return require('@src/assets/images/JAGO.webp');
    case 'jenius':
      return require('@src/assets/images/JENIUS.webp');
    case 'mandiri':
      return require('@src/assets/images/MANDIRI.webp');
    case 'other':
      return require('@src/assets/images/OTHER.webp');
    case 'regis_pana_1':
      return require('@src/assets/images/regis_pana_1.webp');
    case 'regis_pana_2':
      return require('@src/assets/images/regis_pana_2.webp');
    default:
      return undefined;
  }
};
