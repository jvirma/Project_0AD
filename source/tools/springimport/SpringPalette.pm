package SpringPalette;
use strict;
use warnings;

my @palette = (
    "000000",
    "800000",
    "008000",
    "808000",
    "000080",
    "800080",
    "008080",
    "808080",
    "C0DCC0",
    "5454FC",
    "000000",
    "000000",
    "000000",
    "000000",
    "000000",
    "000000",
    "FFEBF3",
    "EBC7D3",
    "D7A3B3",
    "C38797",
    "AF6F7F",
    "9B5B63",
    "8B474F",
    "7B3B47",
    "6F333B",
    "632B33",
    "57232B",
    "4B1B27",
    "3B171F",
    "2F0F17",
    "230B0F",
    "17070B",
    "73FFDF",
    "57E7BF",
    "43CF9F",
    "2FB783",
    "1F9F67",
    "138B4F",
    "0F773F",
    "0B6B37",
    "075F2F",
    "07532B",
    "004727",
    "003F23",
    "00331B",
    "002717",
    "001B0F",
    "00130B",
    "E3EFFF",
    "C7DFE7",
    "AFCFCB",
    "93B7A7",
    "7F9F83",
    "6B8767",
    "5F6F53",
    "5F6347",
    "5B573B",
    "534333",
    "473B2B",
    "3B3323",
    "2F2B1B",
    "231F13",
    "17130F",
    "0B0B07",
    "FBFBD7",
    "DFDFB7",
    "C3C39B",
    "ABAB83",
    "93936F",
    "777757",
    "636343",
    "535333",
    "434323",
    "333317",
    "23230F",
    "1B1B07",
    "171707",
    "131300",
    "0F0F00",
    "0B0B00",
    "FBFBFB",
    "EBEBEB",
    "DBDBDB",
    "CBCBCB",
    "BBBBBB",
    "ABABAB",
    "9B9B9B",
    "8B8B8B",
    "7B7B7B",
    "6B6B6B",
    "5B5B5B",
    "4B4B4B",
    "3B3B3B",
    "2B2B2B",
    "1F1F1F",
    "0F0F0F",
    "EBF3FF",
    "CBE3FF",
    "AFCFFF",
    "97B3FF",
    "7B97FF",
    "677FFF",
    "536BEF",
    "3F5BE3",
    "334BD7",
    "233BCB",
    "172FAF",
    "0F2797",
    "071F7B",
    "071763",
    "000F47",
    "000B2F",
    "E3F7FF",
    "BFDBE7",
    "9FBFCF",
    "83A7B7",
    "6B8FA3",
    "53778B",
    "3F5F73",
    "2F4B5F",
    "273F57",
    "23374F",
    "1F2F47",
    "1B273F",
    "171F37",
    "131B2F",
    "0F1327",
    "0B0F1F",
    "D7EFFF",
    "BBE3EF",
    "9BCBDF",
    "83B7CF",
    "6BA3C3",
    "538FB3",
    "3F7BA3",
    "2F6B97",
    "235B87",
    "1B4B77",
    "133F67",
    "0B3357",
    "072747",
    "001B37",
    "001327",
    "000B1B",
    "FFE7FF",
    "E7C7EB",
    "D3ABD7",
    "BB93C3",
    "A77BB3",
    "8F639F",
    "774B8F",
    "633B7F",
    "4F2B6F",
    "431F63",
    "371757",
    "2B0F47",
    "1F073B",
    "13002B",
    "0B001F",
    "070013",
    "D7FFA7",
    "ABE77F",
    "83D35B",
    "67BF3F",
    "4BAB2B",
    "43972B",
    "378727",
    "2F771B",
    "2B6713",
    "235B0F",
    "1F4F0B",
    "1B4307",
    "173300",
    "0F2700",
    "0B1B00",
    "070F00",
    "FFE39F",
    "E3C773",
    "CBAF53",
    "B3973F",
    "9B832F",
    "836F23",
    "6B5B17",
    "53470F",
    "4B3B0B",
    "433307",
    "3B2B07",
    "372300",
    "2F1B00",
    "271300",
    "1F0F00",
    "1B0B00",
    "FFFFA3",
    "FBF383",
    "F7E367",
    "F3D34F",
    "EFBB33",
    "EFA71B",
    "EB8F13",
    "E77B0F",
    "DF4F07",
    "D72300",
    "BF1F00",
    "A71B00",
    "931700",
    "7B1300",
    "631300",
    "4F0F00",
    "FFFF00",
    "FFBF00",
    "FF8300",
    "FF4700",
    "D32B00",
    "AB1700",
    "7F0700",
    "570000",
    "DFCBFF",
    "BB9FDF",
    "9B77BF",
    "7F579F",
    "673B7F",
    "4B235F",
    "33133F",
    "1B071F",
    "D3DBFF",
    "879FF7",
    "436FEF",
    "1747E7",
    "0B2BBB",
    "07178F",
    "000763",
    "000037",
    "7BFF77",
    "53DF4F",
    "33BF2B",
    "1B9F13",
    "1B7F0B",
    "175F07",
    "133F00",
    "0B1F00",
    "000000",
    "000000",
    "000000",
    "000000",
    "000000",
    "000000",
    "FFFBF0",
    "A0A0A4",
    "808080",
    "FF0000",
    "00FF00",
    "FFFF00",
    "0000FF",
    "FF00FF",
    "00FFFF",
    "FFFFFF"
);

sub get_image
{
    my ($idx) = @_;
    return "xc:#" . $palette[$idx] . "[4x4]";
}

1;
