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
    default:
      return undefined;
  }
};
