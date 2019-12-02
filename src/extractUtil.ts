import { load } from 'cheerio';
import { extractRoleText as extRoleT, extractNationText as extNationT,
  extractFormerTeamText as extFormerTeamT, extractFormerTeamOpText as extFormerTeamOT } from './extractUtilText';
import { OWLFormerTeam, OWLTransfer } from './OWLTranferIfm';

enum FormerTeamFlag {
  NoTeam = 0,
  Player,
  WasCoach,
  WasPlayer,
}

const $ = load('');

export const extractTeam = (elem: CheerioElement): string => {

  const ic: CheerioElement = elem.firstChild.firstChild;

  try {
    if (ic.firstChild.type === 'text') {
          // 처음에 빈 요소가 있다면
      return ic.children[1].lastChild.attribs.title;
    }  if (ic.firstChild.type === 'tag') {
          // 바로 tag가 있다면
      if (ic.firstChild.name === 'strong') {
            // 그 태그가 strong 태그면
        return ic.firstChild.lastChild.attribs.title;
      }
            // a 태그면 (기타의 경우)
      return ic.children[2].attribs.title;

    }
    throw new Error('Exception occured!');

  } catch (error) {
    console.error('Team detection error!');
    console.error(ic.children);
    console.error(error);
  }
};

export const extractPlayerName = (elemPlayer: CheerioElement): string => {
  return $('div', $(elemPlayer).html()).text().trim();
};

export const extractPlayerID:(elemPlayer: CheerioElement) => string = extractPlayerName;

export const extractPlayerPosition = (elemPlayer: CheerioElement): string => {
  if (elemPlayer.firstChild.firstChild.data !== undefined &&
    elemPlayer.firstChild.firstChild.data.trim().length > 0) {
    return $('div', $(elemPlayer).html()).text().trim();
  }
  const prcdPosition: string = $('div a', $(elemPlayer).html()).attr('title');
  return extRoleT(prcdPosition);
};

export const extractPlayerNationality = (elemPlayer: CheerioElement): string[] => {
  const result: string[] = [];
  $('div', $(elemPlayer).html())
    .find('a')
    .each((index: number, elemPlayerNation: CheerioElement) => {
      result.push(extNationT($(elemPlayerNation).attr('title')));
    });
  return result;
};

export const extractFormerTeam
  = (elem: CheerioElement, elemPlayer: CheerioElement): OWLFormerTeam => {
    if ($(elem).attr('style') === 'background-color:#DFD;') { // 무적상태
      return new OWLFormerTeam();
    }

    const ft = new OWLFormerTeam();

    const underDiv = $('div', $(elemPlayer).html()).children();
    // process.stdout.write($('div a', $(elemPlayer).html()).attr('title'));
    // process.stdout.write(extractFormerTeam($('div', $(elemPlayer).html()).text()));
    // process.stdout.write(extractFormerTeam($('div a', $(elemPlayer).html()).text()));

    switch (underDiv.length) {
      case FormerTeamFlag.Player: {
        ft.team = extFormerTeamT($('div', $(elemPlayer).html()).text());
        break;
      }
      case FormerTeamFlag.WasCoach: {

        ft.team           = extFormerTeamT($('div a', $(elemPlayer).html()).text());
        ft.formerPosition = extFormerTeamOT($('div span', $(elemPlayer).html()).text());
        // console.log(underDiv.length);
        // console.log(underDiv);
        break;
      }
      case FormerTeamFlag.WasPlayer: {
        ft.team           = $('div a', $(elemPlayer).html()).attr('title');
        ft.formerPosition = extFormerTeamOT($('div', $(elemPlayer).html()).text());
        // console.log(underDiv.length);
        // console.log(underDiv);
        break;
      }
      default: {
        console.log('Player.FormerTeam Switch default!');
      }
    }
    return ft;
  };
