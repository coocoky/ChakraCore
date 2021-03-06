//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------

WScript.LoadScriptFile("..\\UnitTestFramework\\SimdJsHelpers.js");

var globTotal;
var globVar;
function increment(a, b, lib)
{
    
    var c = lib.add(a, b);
    
    if (lib === SIMD.Float32x4)
    {
        c = lib.add(c, b);    
        globVar = lib.neg(lib.sub(a,c));
        c = globVar;
        c = lib.abs(c);
        globVar = c;
    }
    return c;
}
function func1(c, d, e)
{
    var x, y;
    var i =0;
    var j = 0;

    if (c == true)
    {
        x = SIMD.Float32x4(1, 1, 1, 1);
        globTotal = x;
    }
    else if (d == false)
    {
        y = SIMD.Int32x4(2, 2, 2, 2);
        globTotal = y;
    }
    
    for (i = 0; i < 10; i++)
    {
        for (j = 0; j < 5; j++)
        {
            if (c == true)
            {
                globTotal = increment(globTotal, x, SIMD.Float32x4);
                x = SIMD.Float32x4(1, 1, 1, 1);
            }
            else if (d == false)
            {
                globTotal = increment(globTotal, y, SIMD.Int32x4);
                y = SIMD.Int32x4(2, 2, 2, 2);
            }
        }
    }
    return x;
}

var c = false;
var d = false;
var z;
func1(c, d);

for (i = 0; i < 10; i++)
{
    z = func1(c, d);
    equalSimd([102,102,102,102], globTotal, SIMD.Int32x4, "func1");
}
c = !c;
d = !d;
// Bail on No profile on first call.
for (i = 0; i < 10; i++)
{
    z = func1(c, d);
    equalSimd([2.0, 2.0, 2.0, 2.0], globTotal, SIMD.Float32x4, "func2");
}

print("PASS");