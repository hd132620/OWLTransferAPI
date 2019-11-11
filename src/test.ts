export function extractRole(str: string): string {
  const forming: string[] = str.split('_');
  switch (forming[forming.length - 1].split('.')[0]) {
    case 'offense': {
      return '공격';
    }
    case 'tank': {
      return '돌격';
    }
    case 'support': {
      return '지원';
    }
  }
}

export function extractNation(str: string): string {
  const forming: string[] = str.split(':');
  return forming[1].split(' ')[0];
}
