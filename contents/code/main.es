/***************************************************************************
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA .        *
 ***************************************************************************/
 
function init()
{
    comic.comicAuthor = "Scott R. Kurtz";
    comic.firstIdentifier = "1998/05/04";
    comic.websiteUrl = "http://pvponline.com/";
    comic.curl = "http://pvponline.com/comic/";
    //comic.title = "PvP";
    comic.requestPage(comic.websiteUrl, comic.User);
}
 
function pageRetrieved(id, data)
{
    if(id==comic.User){
       var re = new RegExp("alt=\"thm_(\\d{4})(\\d{2})(\\d{2})");
       var match = re.exec(data);
       if(match!=null){
	  fecha=match[1]+match[2]+match[3];
	  comic.lastIdentifier = match[1]+"/"+match[2]+"/"+match[3];
//	  print(comic.lastIdentifier.toString("yyyy/MM/dd"));
	  url=comic.curl+comic.identifier.toString("yyyy/MM/dd/");
	  comic.requestPage(url, comic.Page);
//	  print(url+" "+fecha);
	  if(comic.identifier.dayOfWeek() == 1){
	     comic.previousIdentifier=comic.identifier.addDays(-3);
	     comic.nextIdentifier=comic.identifier.addDays(1);
	  }
	  if(comic.identifier.dayOfWeek() == 5){
	     comic.previousIdentifier=comic.identifier.addDays(-1);
	     comic.nextIdentifier=comic.identifier.addDays(3);
	  }
       }else{
	   comic.error();
       }       
    }
    if(id==comic.Page){
      //print("ERE");
       var re = new RegExp("(http://newcdn.pvponline.com/img/comic/pvp"+comic.identifier.toString("yyyyMMdd")+"[^\\.]*\\.\\S\\S\\S)");
       var match = re.exec(data);
       //print(re);
       if(match!=null){
	  //print(match[1]);
	  comic.requestPage(match[1], comic.Image);
       }else{
	   comic.error();
	   return;
       }
    }
}

