import fs, { Dirent } from "fs";
import { NextRequest, NextResponse } from "next/server";

import { homedir } from "os";

export const dynamic = "force-dynamic";
export function GET(req: NextRequest) {
  try{

    const param = req.nextUrl.searchParams.get("path");
    const isHome = !param || param === "/";
    const folderPath = isHome ? homedir() : homedir() + param;
  
    const folderName = isHome
      ? "Home"
      : folderPath.split("/").findLast((item) => item);
  
    const folders: Partial<Dirent>[] = [];
    const files: Partial<Dirent>[] = [];
    const filesAndFolders = fs.readdirSync(folderPath, {
      withFileTypes: true,
    });
    filesAndFolders.forEach((item: Dirent) => {
      if (item.isDirectory()) {
        if (!item.name.startsWith(".")) {
          folders.push({ ...item, path: folderPath.replace(homedir(), "") });
        }
      } else if (item.isFile()) {
        if (!item.name.startsWith(".")) {
          files.push({ ...item, path: folderPath.replace(homedir(), "") });
        }
      }
    });
    
    return NextResponse.json(
      {
        parentPath: folderPath,
        path: folderPath === homedir() ? "/" : folderPath.replace(homedir(), ""),
        name: folderName,
        folders,
        files,
      },
      { status: 200 }
    );
  }catch(e){
    return NextResponse.json(
      {
        error: e
      },
      { status: 400 }
    );
  }
}
