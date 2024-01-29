import {parseWithRefs} from "../src";

const circularJson = JSON.stringify({
    "$id": "1",
    "Name": "Tyler Stein",
    "Manager": null,
    "DirectReports": {
        "$id": "2",
        "$values": [
            {
                "$id": "3",
                "Name": "Adrian King",
                "Manager": {
                    "$ref": "1"
                },
                "DirectReports": null
            }
        ]
    }
});

it("Reference object is the same", () => {
    const parsed = parseWithRefs(circularJson);

    expect(parsed).toStrictEqual(parsed.DirectReports[0].Manager);
})